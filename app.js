const express = require("express");
const data = require("./data/datas.json");
const bodyParser = require("body-parser");
const { v4 } = require("uuid");
const productRouter = require("./controller/routers")

const app = express();
const port = process.env.PORT || 3000;


const middlewares = function (req, res, next) {
    console.log('middleware addon')
    console.log(`middleware -  ${req.url}  ${req.method} -- ${new Date()}`)
    next()
}

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(middlewares)

// if (process.env.NODE_ENV !== "production") {
//     require("dotenv").config();
// }

// http://localhost:3000/
app.use("/", middlewares,productRouter);
app.use("/task/addjob",middlewares,productRouter)
app.use("/task",middlewares,productRouter)
app.use("/task/premium",middlewares,productRouter)

app.listen(port, () => {
  console.log(`server start port at  ${port}`);
});
