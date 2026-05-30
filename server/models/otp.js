const monfgoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    action: {
        type: String,
        required: true,
        enum: ['registration', 'password_reset'],
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    otpExpiry: {
        type: Date,
        required: true,
    },
}, {timestamps: true});
    
    module.exports = mongoose.model('Otp', otpSchema);
