const mongoose=require("mongoose")

const connectDb=async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017")
console.log("Mongodb connected Successfully")
    }
    catch(err){
        console.log(err.message)
    }

}

module.exports={connectDb}