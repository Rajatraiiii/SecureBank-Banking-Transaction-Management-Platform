const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true,"Email is required"],
        trim:true,
        lowercase:true,
        match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"Please provide a valid email address"],
        unique: [true,"Email already exists"]
    },
    name:{
        type: String,
        required: [true,"Name is required"],
        trim:true,
        minlength: [3,"Name must be at least 3 characters long"],
        maxlength: [50,"Name must be less than 50 characters long"]
    },
    password: {
        type: String,
        required: [true,"Password is required"],
        minlength: [6,"Password must be at least 6 characters long"],
        select: false
        
    },
});