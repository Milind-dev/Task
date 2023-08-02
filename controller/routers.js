// // C:\Users\Lenovo\taskperformance\controller

// // http://localhost:3000/
// app.get("/", middlewares,(req, res) => {
//     res.json(data)
// });

// // http://localhost:3000/task?types=Active_Jobs
// app.get("/task", middlewares,(req, res) => {
// var types = req.query.types
// console.log(types)
// if(types === "Active_Jobs"){
//     let {type} = data;
//     res.json({type})
// }
// else{
//     res.send({message:"404"})
// }
// });

// // http://localhost:3000/task/premium?pre=true
// app.get("/task/premium", (req, res) => {
//     let {jobData} = data
//     let arr = []
//     if(arr.length === null){
//         return;
//     }
//     for(const x in jobData){
//         let c = jobData[x].name
//         console.log(c)
//         arr.push(c);
//     }
//     res.status(200).json({arr})
//     // res.send({message:"404"})
// });

// // http://localhost:3000/task/Doctor
// app.get("/task/:name", middlewares,(req, res) => {
// const names = req.params.name;
// const {jobData} = data;
// for(var i = 0 ;i<jobData.length;i++){
//     if(jobData[i].name === names){
//         // console.log("222222 ",res,jobData[i].name)
//         res.json({name:jobData[i].name,location:jobData[i].location})
//     }
// }
// res.send("error")
// });

// app.post("/task/addjob",middlewares,(req,res) => {
//  var jsondatas = {
//     "name" : req.body.name,
//     "location" : req.body.location,
//     "posted" : req.body.posted,
//     "status" : req.body.status,
//     "applied" : req.body.applied,
//     "jobViews" : req.body.jobViews,
//     "daysLeft" : req.body.daysLeft,
//     "premium" : req.body.premium,
//     "dateFormat" : req.body.dateFormat
//   }
//   var { jobData } = data;
//   for (let i = 0; i < jobData.length; i++) {
//     jobData.push(jsondatas);
//     // jobData.push(jsondatas)
//     return res.json({message:'User has been added successfully'});
// }
// })

const express = require("express");
const router = express.Router();
const data = require("../data/datas.json");

// Handling request using router
router.get("/", (req, res, next) => {
  res.status(200).json({ data, message:"data succesfully loaded" });
});
router.post("/task/addjob", (req, res) => {
  var jsondatas = {
    name: req.body.name,
    location: req.body.location,
    posted: req.body.posted,
    status: req.body.status,
    applied: req.body.applied,
    jobViews: req.body.jobViews,
    daysLeft: req.body.daysLeft,
    premium: req.body.premium,
    dateFormat: req.body.dateFormat,
  };
  var { jobData } = data;
  for (let i = 0; i < jobData.length; i++) {
    jobData.push(jsondatas);
    // jobData.push(jsondatas)
    return res
      .status(200)
      .json({ message: "User has been added successfully" });
  }
});

// http://localhost:3000/task?types=Active_Jobs
router.get("/task", (req, res) => {
  var types = req.query.types;
  console.log(types);
  if (types === "Active_Jobs") {
    let { type } = data;
    res.status(200).json({ type, message:"succefully Active jobs type " });
  } else {
    res.send({ message: "404",message:"not found" });
  }
});

// http://localhost:3000/task/Doctor
router.get("/task/:name", (req, res) => {
  const names = req.params.name;
  const { jobData } = data;
  for (var i = 0; i < jobData.length; i++) {
    if (jobData[i].name === names) {
      // console.log("222222 ",res,jobData[i].name)
      res.status(200).json({ name: jobData[i].name, location: jobData[i].location });
    }
  }
  res.status(404).send("error");
});


// http://localhost:3000/task/job/premiumsDatas?ispre=true
router.get("/task/job/premiumsDatas", (req, res) => {
  let { jobData } = data;
  let ispre = req.query.ispre;
  console.log(ispre);
  if(ispre === "false"){
    const premiumsDatas = jobData.filter((el,index) => el.premium === false)
    res.json({premiumsDatas,message:"succesffully filter false data"})
  }
  else{
    const premiumsDatas = jobData.filter((el,index) => el.premium === true)
    res.status(200).json({premiumsDatas,message:"successfully true data filter",status:res.status})
  }
});






// // http://localhost:3000/task/premium?pre=true
// router.get("/task/premium", (req, res) => {
//   let { jobData } = data;
//   let arr = [];
//   if (arr.length === null) {
//     return;
//   }
//   for (const x in jobData) {
//     let c = jobData[x].name;
//     console.log(c);
//     arr.push(c);
//   }
//   res.status(200).json({ arr });
//   // res.send({message:"404"})
// });
// http://localhost:3000/task/premium?pre=true



// Importing the router
module.exports = router;
