const express = require("express");
const mongoose = require("mongoose");
const routes=require("./Routes/index");
const cors = require("cors")

const app=express();

const host="localhost";
const port=2021;

app.use(cors());
app.options("*",cors())

app.use(express.json())
app.use('/',routes);

mongoose.connect("mongodb+srv://akj123:8XGtAe9XFsQ4WIE0@zomatoclone.12piz.mongodb.net/zomato?retryWrites=true&w=majority",{ useNewUrlParser: true , useUnifiedTopology: true })
.then(res=>{
    app.listen(port,host,()=>{
    console.log(`Server is running on ${host}:${port}`);
    })
})
.catch(err =>console.log(err));