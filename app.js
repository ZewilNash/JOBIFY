require("express-async-errors");
require("dotenv").config()

const express = require("express");
const app = express();

const cors = require("cors");

const errorhandlerMiddleware = require("./middleware/errorHandler");

const bodyParser = require("body-parser")

const authRouter = require("./routes/user");

const connectDB = require("./db/connection");

const User = require("./modals/User");
const ExtraUser = require("./modals/Extra");

const PORT = process.env.PORT || 3000


app.use(express.json());
app.use(bodyParser());  
app.use(express.static("public"));
app.set("view engine" , "ejs");

app.use(cors());


// MAIN APP ROUTES

app.get("/" , (req,res) => {
    res.render("pages/home/index");
});

app.get("/worker-join" , (req,res) => {
    res.render("pages/worker-join/index");
});


app.get("/login" , (req,res) => {
    res.render("pages/login/index");
});

app.get("/customer-join" , (req,res) => {
    res.render("pages/customer-join/index");
});


app.get("/users/get/:id" , async (req,res) => {

    const user = await User.findOne({_id:req.params.id});

    const role = user.role;

    const allUsers = await User.find({role:`${role === "customer" ? "worker" : "customer"}`});

    res.render("pages/users/index" , {users:allUsers});
});

app.get("/feed/:id" , async (req,res) => {
    const user = await User.findOne({_id:req.params.id});


    res.render("pages/feed/index" , {id:user._id,fullname:user.fullname , bio:user.bio,about:user.about,image:user.image,minInDoller:user.minInDoller , maxInDoller:user.maxInDoller , profession:user.profession , role:user.role});
})

app.get("/user/:id" , async (req,res) => {

    const user = await User.findOne({_id:req.params.id});
   
    
    const extrauser = await ExtraUser.findOne({user:req.params.id});

    if(!extrauser){
        
        return res.render("pages/profile/index" , {id:user._id,fullname:user.fullname ,bio:user.bio,about:user.about,image:user.image,minInDoller:user.minInDoller , maxInDoller:user.maxInDoller , profession:user.profession , role:user.role , email:user.email,exist:false});
    }
    
    res.render("pages/profile/index" , {id:user._id,fullname:user.fullname , bio:user.bio,about:user.about,image:user.image,minInDoller:user.minInDoller , maxInDoller:user.maxInDoller , profession:user.profession , role:user.role , facebook:extrauser.facebooklink,instagram:extrauser.instagramlink,youtube:extrauser.youtubelink,whatsapp:extrauser.whatsappnumber,telegram:extrauser.telegramnumber,email:user.email,exist:true});
})

app.get("/myprofilepage/:id" , async (req,res) => {

    const user = await User.findOne({_id:req.params.id});
    const extrauser = await ExtraUser.findOne({user:req.params.id});

    // console.log(extrauser , user);

    if(!extrauser){
        
        
        return res.render("pages/myprofile/index" , {id:user._id,fullname:user.fullname ,bio:user.bio,about:user.about,image:user.image,minInDoller:user.minInDoller , maxInDoller:user.maxInDoller , profession:user.profession , role:user.role , email:user.email , exist:false});
    }


    res.render("pages/myprofile/index" , {id:user._id,fullname:user.fullname ,bio:user.bio,about:user.about,image:user.image,minInDoller:user.minInDoller , maxInDoller:user.maxInDoller , profession:user.profession , role:user.role , facebook:extrauser.facebooklink,instagram:extrauser.instagramlink,youtube:extrauser.youtubelink,whatsapp:extrauser.whatsappnumber,telegram:extrauser.telegramnumber,email:user.email,exist:true});
})



// END MAIN APP ROUTES

app.use("/api/v1/auth" , authRouter);

app.all("*" , (req,res) => {
    res.status(404).json({msg:"Route does not exists"});
});


app.use(errorhandlerMiddleware);



const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(PORT , () => {
            console.log(`Server is listening on port: ${PORT}`);
        })
        
    }catch(err){
        console.log(err);
    }
}


start();
