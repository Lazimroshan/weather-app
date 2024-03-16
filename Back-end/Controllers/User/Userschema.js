const mongoose=require('mongoose')

const userscehma=mongoose.Schema({
    Username:{type:String},
    Email:{type:String},
    Password :{type:String},
})

const User=mongoose.model('Weatheruser',userscehma)

module.exports=User