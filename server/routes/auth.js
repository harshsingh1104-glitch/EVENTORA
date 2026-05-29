const express =  require('express');
const router =express.Router();
const {registerUser, loginUser, verifyOtp} = require('../controllers/authController');

// register route
router.post('/register', (req, res) => {
    //logic for registering user
    return res.send("User registered Successfully");
})

 // Login route
 router.post('/login', (req, res) =>{
    // logic for user login
    return res.send("User Logged in Successfully");
 })
  
 // Otp verification route
 router.post('/verify-otp', (req, res) => {
    // Logic for otp Verificatoion
    return res.send("OTP verified Successfully");
 })



  module.exports = router;