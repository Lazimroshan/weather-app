const mongoose=require('mongoose')

const connection=async()=>{
    try{
        const connect= mongoose.connect('mongodb+srv://lasimroshan:Lazim9895@lazim.9prwdxj.mongodb.net/?retryWrites=true&w=majority')
        console.log("Database connected");
    }
    catch(err){
        console.log(`Error${err}`);
        process.exit()
    }
}
module.exports=connection