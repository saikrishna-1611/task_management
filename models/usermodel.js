import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name:{type:String,required:true},
    phoneNumber:{type:String,required:true},
    age:{type:Number,required:true},
    password:{type:String,required:true}
},{
    timestamps:true
})

const UserModel=new mongoose.model('UserModel',userSchema);
export default UserModel 