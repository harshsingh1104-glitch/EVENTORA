const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//routes
app.use('/api/auth', authRoutes);

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('connected to MongoDB');
})
.catch((err) =>{
    console.log('Error connecting to MongoDB:', err);
})



const port = process.env.port || 5000;
app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
})