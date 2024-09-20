const express= require('express');
const session = require('express-session');
const app= express();

require("dotenv").config();
const cookieParser = require('cookie-parser');
const path=require('path');
const flash = require('connect-flash');
app.use(session({
    secret: 'your_secret_key', // You can replace this with an environment variable
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));
app.use(flash());
const adminRouter= require('./routes/adminRouter');
const userRouter =require('./routes/userRouter');
const index= require('./routes/index');

const db= require('./config/mongoose-connection');
app.set("view engine", 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));


app.use("/",index);
app.use("/admin",adminRouter);
app.use("/user",userRouter);
app.listen(3000);

