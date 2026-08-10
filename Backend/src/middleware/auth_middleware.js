import { findUserByEmail } from "../dao/user_dao"
import { verifyToken } from "../utils/helper"

export const authMiddleware=async(req,res,next)=>{ 
    const token=req.cookies.accessToken
    if(!token) return res.status(401).json({message:"Unauthrized"})

        try{
        const decoded=verifyToken(token)
        const user= await findUserByEmail(decoded)
        if(!user) return res.status(401).json({message:"Unauthrized"})
            req.user=user
            next()
        }
        catch(error){
             return res.status(401).json({message:"Unautorized"})
        }
 }
