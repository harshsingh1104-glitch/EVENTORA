const userModel = require('../models/user');

 // register user
    const registerUser = async (req, res) => {
        const {name, email, password} = req.body;
      
        let userExists = await userModel.findOne({email});
        if(userExists){
            return res.status(400).json({message: "User already exists with this email"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        try {
            const user = new userModel({name, email, password: hashedPassword});
            await user.save();
            return res.status(201).json({message: "User registered successfully"});

         const otp = Math.floor(100000 + Math.random() * 900000).toString();
         console.log(`OTP for ${email}:`, otp);

         user.otp = otp;
         user.otpExpiry = Date.now() + 10 * 60 * 1000;


        } catch (error) {
            return res.status(500).json({message: "Error registering user", error: error.message});
        }
    };