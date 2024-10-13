import jwt from "jsonwebtoken";

const authUser=(req,res,next)=>{
    try{
    const authHeader = req.headers["authorization"]
    let token 
    if(authHeader!==undefined){
        token = authHeader.split(" ")[1]
    }
      const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
      req.User=decoded;
      next();
    }
    catch(error)
    {
        return res.status(500).json({status:'fail',message:error.message})
    }
}
export default authUser