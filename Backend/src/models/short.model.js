import mongoose from "mongoose";

 const urlShortnerSchema= new mongoose.Schema({
     full_url:{
        type:String,
        required:true,
     },
     short_url:{
        type:String,
        required:true,
        index:true,
        unique:true,
     },
     clicks:{
        type:Number,
        required:true,
        default:0,
     },
     user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
       
     }
 });

 const shortUrl=mongoose.model("shortUrl", urlShortnerSchema)
 export default shortUrl