import { jsonwebtoken } from "jsonwebtoken";
import User from "../models/user_model.js";
import { createUser, findUserByEmail } from "../dao/user_dao.js";
import { ConflictError } from "../utils/error_handler.js";
import { signToken } from "../utils/helper.js";

export const registerUser=async(name,email,password)=>{
    console.log(email)
    const user = await findUserByEmail(email);
    if(user){
        throw new ConflictError("User already exists");
    }
    const newUser = await createUser({name,email,password});
    const token = await signToken({id:newUser._id});
    return token
}