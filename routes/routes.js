import authUser from "../middelware/authMiddleware.js";
import { register,login,createTask,updateTask,getTasks,deletetask } from "../controllers/controller.js";
import express from "express";

const router=express.Router();

router.post('/register',register);
router.post('/login',login);
router.post('/create-task',authUser,createTask);
router.get('/get-tasks',authUser,getTasks);
router.put('/update-task/:_id',authUser,updateTask);
router.delete('/delete/:_id',authUser,deletetask);

export default router
