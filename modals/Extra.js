const mongoose = require("mongoose");


const ExtraSchema = new mongoose.Schema({
    facebooklink:{
        type:String,
        required:[true , "Please Provide a facebooklink.."],
        trim:true,
        unique:true,
    },
    instagramlink:{
        type:String,
        required:[true , "Please Provide an instagramlink.."],
        trim:true,
        unique:true,
    },

    youtubelink:{
        type:String,
        required:[true , "Please provide youtubelink"],
        trim:true,
        unique:true,
    },

   
    whatsappnumber:{
        type:String,
        required:[true,"Please Provide whatsappnumber.."],
        trim:true,
        unique:true,
    },
    telegramnumber:{
        type:String,
        required:[true , "Please Provide Your telegramnumber.."],
        trim:true,
        unique:true,
    },

    user:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }


}, {timestamps:true});



module.exports = mongoose.model("Extra" , ExtraSchema);