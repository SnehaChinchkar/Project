const express= require('express');
const router= express.Router();

router.get("/",function(req,res){
    let error= req.flash("error");
    res.render("loginreg.ejs",{error,loggedin:false});
})
module.exports = router;