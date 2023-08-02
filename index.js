const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const { v4 } = require("uuid");
const productRouter = require("./controller/routers")

const app = express();
const port = process.env.PORT || 3000;




const middlewares = function (req, res, next) {
    console.log(`middleware -  ${req.url}  ${req.method} -- ${new Date()}`)
    next()
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(middlewares)
// if (process.env.NODE_ENV !== "production") {
//     require("dotenv").config();
// }

// http://localhost:3000/
app.use("/", middlewares,productRouter);
app.use("/task",middlewares,productRouter)
// app.use("/task/premium",middlewares,productRouter)
// app.use("/task/premium",productRouter)
app.use("/task/addjob",middlewares,productRouter)
app.use("/task/job/premiumsDatas",middlewares,productRouter)
app.get('/', async(req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// app.get("/task/job/premiumsDatas", (req, res) => {
//   let { jobData } = data;
//   let ispre = req.query.ispre;
//   console.log(ispre);
//   if(ispre === "false"){
//     const premiumsDatas = jobData.filter((el,index) => el.premium === false)
//     res.json({premiumsDatas,message:"succesffully filter data"})
//   }
//   else{
//     const premiumsDatas = jobData.filter((el,index) => el.premium === true)
//     res.json({premiumsDatas,message:"bi"})
//   }
// });


app.listen(port, () => {
  console.log(`server start port at  ${port}`);
});
