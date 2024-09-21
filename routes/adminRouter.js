const express= require('express');
const router= express.Router();
const bcrypt= require('bcrypt');
const adminModel= require('../models/admin-model');
const {generateToken} = require('../utils/generateToken');
router.get('/',function(req,res){
    res.render("adminlogin.ejs", { error: "", loggedin: false });
})

if(process.env.NODE_ENV === "development"){
    router.post("/create",async function(req,res){
        let admin= await adminModel.find();
        if(admin.length>0){
            return res
            .status(503)
            .send("You don't have permission to create admin");
        }
        let {fullname,email,password}= req.body;
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt,async function(err, hash) {
                if(err) return res.send(err.message);
                let createadmin= await adminModel.create({
                    fullname,
                    email,
                    password: hash
                })
                try{
                let token= generateToken(createadmin);
                res.cookie("token",token);
                res.render("adminlogin.ejs", { error: "", loggedin: true });
                }
                catch(error){
                    console.error("Token generation failed:", error);
                    res.send("Error generating token");
                }
                res.send(createadmin);
            });
        });
          
    })
    router.post("/login", async function (req, res) {
        let { email, password } = req.body;
        let found = await adminModel.findOne({ email });
        if (!found) {
            return res.send("Invalid email or password");
        }
        try {
            let token = generateToken(found);
            res.cookie("token", token);
            res.render("adminlogin.ejs", { error: "", loggedin: true,isAdmin:true });
        } catch (error) {
            console.error("Token generation failed:", error);
            res.send("Error generating token");
        }
    });
        
}
module.exports = router;