const Mylocations = require("./Mylocationschema")


const createlocation=async(req,res)=>{
    const {mylocations,userid}=req.body
    const Myloc=await Mylocations.create({
        mylocations,userid
    })
    res.json(Myloc)
}

const deleteloc=async(req,res)=>{
    const _id=req.params.id
    const Dloc=await Mylocations.findByIdAndDelete(_id)
} 


const getlocations=async(req,res)=>{
    const _id=req.params.id
    const loc= await Mylocations.find({userid:_id})
    res.json(loc)
}


module.exports={createlocation,deleteloc,getlocations}