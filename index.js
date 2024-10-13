import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDb from "./utils/db.js";
import router from "./routes/routes.js";

dotenv.config({})
const app=express()
app.use(express.json())
app.use('/api/v3/',router)
const port=3000

app.listen(port,()=>{
    console.log(`connected to port ${port}`)
})

connectDb()