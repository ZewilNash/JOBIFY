const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const UserSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:[true , "Please Provide a name.."],
        trim:true,
        minlength:[4 , "fullname filed must be more than 4 characters"],
        maxlength:[100 , "fullname field must not exceed 100 characters"]
    },
    email:{
        type:String,
        required:[true , "Please Provide an email.."],
        trim:true,
        unique:true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide valid email'
        ],

    },
    password:{
        type:String,
        required:[true , "Please provide password"],
        trim:true,
        minlength:[10 , "password filed must be more than 10 characters"],
        match:[
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$/,

            'Please provide valid password (one Capital Letter , One smaller , one special , one number)'

        ]
    },

    role:{
        type:String,
        enum:["customer" , "worker"],
        required:[true , "Please Provide Role"],
        default:"worker"
    },

    bio:{
        type:String,
        required:[true,"Please Provide Bio.."],
        trim:true,
        minlength:[6 , "bio filed must be more than 6 characters"],
        maxlength:[250 , "bio field must not exceed 250 characters"]
    },
    image:{
        type:String,
        required:[true , "Please Provide Your Image.."],
    },

    profession:{
        type:String,
        required:[true,"Please Provide Your Skill Name.."],
        trim:true,
        minlength:[6 , "profession filed must be more than 6 characters"],
        maxlength:[50 , "profession field must not exceed 50 characters"]
    },

    about:{
        type:String,
        required:[true,"Please Provide Your INFO.."],
        trim:true,
        minlength:[10 , "about filed must be more than 10 characters"],
        maxlength:[350 , "about field must not exceed 350 characters"]
    },
    minInDoller:{
        type:Number,
        required:[true,"Please Provide Your Min In Dollar.."],
    },
    maxInDoller:{
        type:Number,
        required:[true,"Please Provide Your Max In Dollar.."],
    },

}, {timestamps:true});


UserSchema.pre("save" , async function(next) {
    // hash password
    const salt = await bcrypt.genSalt(10);
    
    this.password = await bcrypt.hash(this.password , salt);

    next();
});

UserSchema.methods.createToken =  function () {
    return jwt.sign({id:this._id} , process.env.JWT_SECRET , {
        expiresIn:"30d"
    });
}

UserSchema.methods.comparePasswords = async function (userPassword){
    const isEqual = await bcrypt.compare(userPassword , this.password);

    return isEqual;
}


module.exports = mongoose.model("User" , UserSchema);