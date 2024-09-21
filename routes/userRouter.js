const express = require('express');
const router = express.Router();

const userModel = require('../models/user-model');
const { generateToken } = require('../utils/generateToken');

router.get('/', function (req, res) {
    res.send("User Page");
});

router.post("/create", async function (req, res) {
    let { fullname, email, password } = req.body;
    let found = await userModel.findOne({ email });
    if (found) {
        return res.send("User already exists");
    }
    let user = await userModel.create({
        fullname,
        email,
        password
    });
    try {
        let token = generateToken(user);
        res.cookie("token", token);
        res.render("loginreg.ejs", { error: "", loggedin: true });
    } catch (error) {
        console.error("Token generation failed:", error);
        res.send("Error generating token");
    } 
});

router.post("/login", async function (req, res) {
    let { email, password } = req.body;
    let found = await userModel.findOne({ email });
    if (!found) {
        return res.send("Invalid email or password");
    }
    try {
        let token = generateToken(found);
        res.cookie("token", token);
        // res.render("loginreg.ejs", { error: "", loggedin: true, isAdmin: false });
        res.send("Successful login");
        
    } catch (error) {
        console.error("Token generation failed:", error);
        res.send("Error generating token");
    }
});


module.exports = router;
