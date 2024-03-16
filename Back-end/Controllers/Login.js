const bcrypt=require('bcrypt')
const User = require('./User/Userschema')

const loginuser=async(req,res)=>{
    const {Password,Email}=req.body
    const login= await User.findOne({Email})
    if(login &&(await bcrypt.compare(Password,login.Password)))
    {
        res.json({message:"success",
        userId:login._id
    }) 
    }
    else{
        res.json("Faild")
    }
}
module.exports=loginuser