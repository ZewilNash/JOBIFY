const User = require("../modals/User");
const Extra = require("../modals/Extra");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const createUser = async (req,res) => {
    
    const user = await User.create({...req.body});

    const token = user.createToken();


    res.status(201).json({user:{fullname:user.fullname , email:user.email,_id:user._id,role:user.role,bio:user.bio,about:user.about,profession:user.profession,image:user.image,minInDoller:user.minInDoller,maxInDoller:user.maxInDoller} , token , success:true});

}


const loginUser = async (req,res) => {
    const {email,password} = req.body;

    if(!email || !password){
        return res.status(400).json({msg:"Please provide email and password",success:false});
    }

    const user = await User.findOne({email});

    if(!user){
        return res.status(401).json({msg:"Invalid Credentials" , success:false});
    }

    const isEqualPasswprds = await user.comparePasswords(password);

    console.log(isEqualPasswprds);
    

    if(!isEqualPasswprds){
        return res.status(401).json({msg:"Invalid Credentials" , success:false});
    }

    const token = user.createToken();

    res.status(200).json({user:{fullname:user.fullname , email:user.email,_id:user._id,role:user.role,bio:user.bio,about:user.about,profession:user.profession,image:user.image,minInDoller:user.minInDoller,maxInDoller:user.maxInDoller} , token , success:true});

}

const getRoleUsers = async (req,res) => {
    const {role} = req.params;

    users = await User.find({role:role});

    res.status(200).json({users , success:true});

}


const getUsers = async (req,res) => {
    const {role,search_text} = req.params;

    let users;

    if(search_text){

        users = await User.find({
            $or: [
                    {
                      fullname: { "$regex": search_text }
                    },
                    {
                        about: { "$regex": search_text }
                    },
                    {
                        bio: { "$regex": search_text }
                    },
                    {
                        profession: { "$regex": search_text }
                    },
                 ]
        })

        users = users.filter(user => user.role === role);

        

    }else {
        users = await User.find({role:role});
    }

    res.status(200).json({users , success:true});
}


const editProfile = async (req,res) => {
    const user = await User.findByIdAndUpdate({_id:req.params.id} , {...req.body} , {new:true});

    res.status(200).json({user , msg:"Updated Successfully" , success:true});
}


const extraData = async (req,res) => {
    const extraData = await Extra.create({...req.body , user:req.params.id});
    res.status(201).json({extraData , success:true});
}


module.exports = {
    createUser,
    loginUser,
    getUsers,
    getRoleUsers,
    editProfile,
    extraData
}