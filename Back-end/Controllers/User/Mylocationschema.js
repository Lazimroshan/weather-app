const mongoose=require('mongoose')

const mylocationschema=mongoose.Schema({
    mylocations:{type:String},
    userid:{type:String}
})

const Mylocations=mongoose.model('Weatherlocation',mylocationschema)

module.exports=Mylocations 