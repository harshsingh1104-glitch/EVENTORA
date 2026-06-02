const userModel = require('../models/user');
const OTP = require('../models/OTP');
const bcrypt = require('bcryptjs');
const {sendOTPEmail} = require('../utils/emailService');
const jwt = require('jsonwebtoken');


const generateToken = (id, role) =>{
    return jwt.sign({id, role}, process.env.JWT_SECRET, {expiresIn: '1d'});
}

 // register user
    const registerUser = async (req, res) => {
        const {name, email, password} = req.body;
      
        let userExists = await userModel.findOne({email});
        if(userExists){
            return res.status(400).json({message: "User already exists with this email"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

    
         //Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        try{
            const user = await userModel.create({name,email,password: hashedPassword, roler:'user'});
            console.log(`OTP for ${email}: ${otp}`); // Log OTP to console for testing purposes
            await OTP.create({email, otp, action : 'account verification'});
            await sendOTPEmail(email, otp, 'Account Verification');

            res.status(201).json({
                message: "User registered successfully. Please check your email for OTP to verify your account.",
                email: user.email
            });
        }

         catch (error) {
            return res.status(500).json({message: "Error registering user", error: error.message});
        }
    };

     //Lodin user
     exports.loginUser = async(req,res) => {
        const {email,passwaord} = req.body;

        let user = await user.ModelfindOne({email});
        if(!user){
            return res.status(400).json({
                message: "Invalid credential"
            });

            const isMatch = await bcrypt.compare(password, user.password);
            if(!ismatch){
                return res.status(400).json({
                    message: "Invalid credential"
                });
            }

            if(!user.isVerified && user.role === 'user'){
                const otp = Math.floor(100000 + Math.random() * 900000).toString();
                await OTP.deleteMany({email, action: 'account_verification'});//Remove any existing OTPs for this email and action
                await OTP.create({email, otp, action: 'account_verification'});
                await sendOTPEmail(email, otp, 'Account Verification');
                return res.status(400).json({
                    message: "Account not verified. Please check your email for OTP to verify your account."
                });
            }
            
            res.json({
                message: ("Login successful"),
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    isVerified: user.isVerified,
                    token: generateToken(user._id, user.role)
                }
            });

        }
    };
       
    // otp verify
    exports.verifyOTP = async (req,res) => {
        const {email, otp} = req.body;
        const otpRecord = await OTP.findOne({email, otp, action: 'account_verification'});

        if(!otpRecord){
            return res.status(400).json({message: "Invalid OTP"});
        }

        // If OTP is valid, update user's verification status
        await userModel.updateOne({email}, {isVerified: true});
        await OTP.deleteOne({email, otp, action: 'account_verification'});

        res.json({message: "OTP verified successfully"});
    }

