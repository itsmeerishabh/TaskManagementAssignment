const asyncHandler=require("express-async-handler")
const User=require("../models/userModel.js");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

//@desc Register user
//@route POST /api/user
//@access public

const registerUser = asyncHandler(async (req, res)=>{
    const {name, email, password}=req.body;
    
    if(!name || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const userAvailable=await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered!");
    }

    const hashPassword= await bcrypt.hash(password,10);
    const user= await User.create({
        name, //name:req.body.name
        email,    //email:req.body.email
        "password":hashPassword //password=req.body.password
    })
    if(user){
        res.status(201).json({_id:user._id, name:user.name, email:user.email});
    }else{
        res.status(400);
        throw new Error("User not register");
    }
    
})

//@desc Login user
//@route POST /api/user
//@access public

const loginUser = asyncHandler(async (req, res)=>{
    const {email,password}=req.body;
    
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const user= await User.findOne({email:req.body.email});
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken= jwt.sign({
            usser:{
                id:user.id,
                name:user.name,
                email:user.email,
                role:user.role     
            },
        },process.env.SECRET_KEY,{expiresIn:"60m"})
        res.status(200).json({accessToken,"name":user.name,"user_id":user._id, "role":user.role });
    }else{
        res.status(401);
        throw new Error("Invalid credentials");
    }
    
});

module.exports={registerUser, loginUser};