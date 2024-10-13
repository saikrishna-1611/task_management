import mongoose from "mongoose";

const connectDb=async(req,res)=>{
    try{
       await mongoose.connect(process.env.MONGODB_URL)
        console.log("connected to MONGO_DB")
 }
    catch(error){
        console.log(error.message)
    }  
}

export default connectDb