const express= require('express');
const router= express.Router();

const userModel= require('../models/user-model');


router.get('/',function(req,res){
    res.send("User Page");
})
router.post("/create",async function(req,res){
    let{fullname,email,password}=req.body;
    let found= await userModel.findOne({email});
    if(found.lenght>0){
        return res.send("Something went wrong");
    }
    let user= await userModel.create({
        fullname,
        email,
        password
    })
    res.redirect()

})
module.exports = router;