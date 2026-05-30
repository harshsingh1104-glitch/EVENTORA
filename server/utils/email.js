const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    } 
});

 exports.sendOtpEmail = async (email, otp, type) => {
      try{
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP for Eventora',
        text: `Your OTP for Eventora is: ${otp}. It is valid for 10 minutes.`
    };
    await transporter.sendMail(mailOptions);
    console.log(`OTP email sent to ${email} for ${type}`);
      }
    catch(error) {
        console.error(`Error sending OTP email to ${email} for ${type}:`, error);
        throw new Error('Failed to send OTP email');
    }
};
  const sendOtpEmail = async (email, otp, type) => {
    try{
    const tittle= type === 'account_verification' ? 'verify your Eventora Account' : 'Eventora Booking Verfication'
    const msg = type === 'account_verification'
    ? 'please use the following OTP to verify your new Eventora account.'
    : 'Please use the following OTP to verify your and confirm your event booking.';

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to : userEmail,
        subject: title,
        html:
        <div style="font-family:Arial, sans-serif; text-align: center; padding: 20"
    }