const jwt = require("jsonwebtoken");
const User = require("../modals/User");

const authenticateRoute = async (req,res,next) => {
    const userToken = req.headers.authorization;

    if(!userToken || !userToken.startsWith("Bearer ")){
        return res.status(401).json({msg:"Invalid Authorization"});
    }

    const token = userToken.split(" ")[1];

    const decoded = await jwt.verify(token , process.env.JWT_SECRET);

    if(!decoded){
        return res.status(401).json({msg:"Invalid Authorization"});
    }

    const user = await User.findOne({_id:decoded.id});

    if(!user){
        return res.status(401).json({msg:"Invalid Authorization"});
    }

    req.user = user

    next();

}


module.exports  = authenticateRoute;