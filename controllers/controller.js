import UserModel from "../models/usermodel.js";
import taskModel from "../models/taskmodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register= async(req,res)=>{
    try{
      const{name,phoneNumber,age,password}=req.body;
      if(!name||!phoneNumber||!age||!password){
        return res.status(400).json({message:"All feilds are required"})
      }
      const existingUser= await UserModel.findOne({phoneNumber});
      if(existingUser){
        return res.status(400).json({message:"phoneNumber already Exists"})
      }
      //hash password before saving

      const hasedPassword=await bcrypt.hash(password,10);
      const User=new UserModel({
        name,
        phoneNumber,
        age,
        password:hasedPassword,
      });
      await User.save();
      res.status(201).json(User)
    }
    catch(error)
    {
        return res.status(500).json({status:'fail',message:error.message})
    }
}

export const login=async(req,res)=>{
    try{
    const{phoneNumber,password}=req.body
    if(!phoneNumber||!password){
        res.status(400).json({status:'fail',message:"All feilds are required"})
    }
    const User=await UserModel.findOne({phoneNumber});
    if(!User){
        return res.status(400).json({status:'fail',message:"User not found please register"})
    }
    //compare password with the hashed password
    const isMatch=await bcrypt.compare(password,User.password);
    if(!isMatch){
        return res.status({status:'fail',message:"Password isn't matched"})
    }
    //generate token using jsonwebtoken module
    const token= jwt.sign({_id:User._id},process.env.JWT_SECRET_KEY,{expiresIn:'1d'});
    return res.status(200).json({User,token});
    }
    catch(error)
    {
        return res.status(500).json({status:'fail',message:error.message})
    }
}

//create Task

export const createTask=async(req,res)=>{
    try{
    const{title,description,priority,dueDate}=req.body;
    const task=new taskModel({
        name:req.User._id,
        title,
        description,
        priority,
        dueDate
    })
    await task.save();
    return res.status(201).json({task});
    }
    catch(error)
    {
        return res.status(500).json({status:'fail',message:error.message})
    }
}

//get all task for the logged-in user

export const getTasks=async(req,res)=>{
try{
   const tasks=await taskModel.find({name:req.User._id});
   return res.status(200).json({tasks});
}
catch(error)
    {
        return res.status(500).json({status:'fail',message:error.message})
    }
}

//update the task

export const updateTask=async(req,res)=>{
    try{
     const task=await taskModel.findById(req.params._id);
     const {title,description,dueDate}=req.body;
     if(!task)
     {
        return res.status(400).json({message:'task not found'})
     }
     if(task.name.toString()!==req.User._id)
     {
        return res.status(400).json({message:"unauthourized to update"});
     }
    //  task=await taskModel.findByIdAndUpdate(req.params._id,req.body,{new:true});
    task.title=title;
    task.description=description;
    task.dueDate=dueDate;
     res.json(task)
     await task.save();
    }
    catch(error)
    {
        return res.status(500).json({status:'fail',message:error.message})
    }
}

//delete task

export const deletetask=async(req,res)=>{
    try{
    const task=await taskModel.findById(req.params._id);
    if(!task){
        return res.status(400).json({status:'fail',message:"task not found"});
    }
    if(task.name.toString()!==req.User._id){
        return res.status(400).json({msg:"unauthourized to delete"})
    }
    await taskModel.findByIdAndDelete(req.params._id);
    res.json({msg:"task removed"});
    }
    catch(error)
    {
        return res.status(500).json({status:'fail',message:error.message})
    }
}

