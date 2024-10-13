import mongoose from "mongoose";
import UserModel from "./usermodel.js";

const taskSchema=new mongoose.Schema({
    name:{type:mongoose.Schema.Types.ObjectId,ref:'UserModel',required:true},
    title:{type:String,required:true},
    description:{type:String},
    status:{type:String,enum:[`pending`,`in-progress`,`completed`],default:`pending`},
    priority:{type:String,enum:[`high`,`low`,`medium`],default:`medium`},
    dueDate:{type:Date}
},{
    timestamps:true,
}
)

const taskModel=new mongoose.model('taskModel',taskSchema)
export default taskModel