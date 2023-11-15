const env = require('dotenv');
// const path = require("path")



const express = require('express');


const cookieParser = require("cookie-parser");
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
env.config({path:"./config.env"})


const port = process.env.PORT ;

require("./db/conn");
app.use(cookieParser());

app.use(require("./router/auth"));
app.use (require("./models/userSchema"));

  


// deployment code here 
// app.use(express.static(path.join(__dirname, './client/build')));

// app.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
  
// });



app.get("/", (req,res)=>{
    res.send("home page");
})









app.listen(port, (req,res)=>{
    console.log(`listen to the port of ${port}`)
})