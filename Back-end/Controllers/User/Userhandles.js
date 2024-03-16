const User = require("./Userschema")
const bcrypt=require('bcrypt')


const createuser=async (req,res)=>{

    const {Username,Email,Password}=req.body

    const exisistingUser=await User.findOne({Email}) 

    if(exisistingUser){ 
        res.json("User Already exisist")
    }
    else{
    const salt=await bcrypt.genSalt(10)
    const Hpassword=await bcrypt.hash(Password,salt)
    const user=await User.create({
        Username,Email,Password:Hpassword
    })
    res.json({
        id:user._id,
        Username:user.Username,
        Email:user.Email,
        Password:user.Password,
    })
    }
}

const edituser=async(req,res)=>{
    const _id=req.params.id 
    const {Username,Email,Password}=req.body
    const updated=await User.findByIdAndUpdate(_id,{Username,Email,Password})
    res.json(updated)
}

module.exports={createuser,edituser}