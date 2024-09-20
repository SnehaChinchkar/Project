const express= require('express');
const router= express.Router();

const adminModel= require('../models/admin-model');

router.get('/',function(req,res){
    res.send("Admin route works");
})
module.exports = router;