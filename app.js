const express = require("express");
const data = require("./data/datas.json");
// const cors = require('cors')
const bodyParser = require("body-parser");
const { v4 } = require("uuid");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cors({
//     origin: 'http://example.com'
//   }))

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const middlewares = function (req, res, next) {
    console.log('middleware addon')
    console.log(`Logged  ${req.url}  ${req.method} -- ${new Date()}`)

    next()
  }
  app.use(middlewares)

// http://localhost:3000/
app.get("/", middlewares,(req, res) => {
        res.json(data)
});

// http://localhost:3000/task?types=Active_Jobs
app.get("/task", middlewares,(req, res) => {
    var types = req.query.types
    console.log(types)
    if(types === "Active_Jobs"){
        let {type} = data;
        res.json({type})
    }
    else{
        res.send({message:"404"})
    }
});

// http://localhost:3000/task/premium?pre=true
app.get("/task/premium", (req, res) => {
        let {jobData} = data
        let arr = []
        if(arr.length === null){
            return;
        }
        for(const x in jobData){
            let c = jobData[x].name
            console.log(c)
            arr.push(c);
        }
        res.status(200).json({arr})
        // res.send({message:"404"})
});

// http://localhost:3000/task/Doctor
app.get("/task/:name", middlewares,(req, res) => {
    const names = req.params.name;
    const {jobData} = data;
    for(var i = 0 ;i<jobData.length;i++){
        if(jobData[i].name === names){
            // console.log("222222 ",res,jobData[i].name)
            res.json({name:jobData[i].name,location:jobData[i].location})
        } 
    }
    res.send("error")
 });


 app.post("/task/addjob",middlewares,(req,res) => {
     var jsondatas = {
        "name" : req.body.name,
        "location" : req.body.location,
        "posted" : req.body.posted,
        "status" : req.body.status,
        "applied" : req.body.applied,
        "jobViews" : req.body.jobViews,
        "daysLeft" : req.body.daysLeft,
        "premium" : req.body.premium,
        "dateFormat" : req.body.dateFormat   
      } 
      var { jobData } = data;
      for (let i = 0; i < jobData.length; i++) {
        jobData.push(jsondatas);
        // jobData.push(jsondatas)
        return res.json({message:'User has been added successfully'});
    }
 })



app.listen(port, () => {
  console.log(`server start port at  ${port}`);
});





// res.status(200).json(success('OK', {user: 'Hi, John Doe.'}, res.statusCode));
/*
  // Do with validation here
  res.status(422).json(validation({username: 'Username is required.'}))

  try {
    // Dome some with success here
    res.status(200).json(success('OK', {user: 'Hi, John Doe.'}, res.statusCode));
  } catch(err) {
    // Do some with error here
    res.status(500).json(error('Something went wrong.', res.statusCode));
  }
  */