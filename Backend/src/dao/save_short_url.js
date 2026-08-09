import urlSchema from "../models/short.model.js";
import { ConflictError } from "../utils/error_handler.js";
export const saveShortUrl = async (shortUrl,fullUrl,userId) => {
    try{
    const newUrl = new urlSchema({
        full_url: fullUrl,
        short_url: shortUrl
    })
    if(userId){
        newUrl.user=userId
    }
    await newUrl.save();
  }catch(err){
    if(err.code ==11000){
      throw new ConflictError("Short URL Already Exist")
  } throw new Error(err)
}
};

export const getShortUrl=async(shortUrl)=>{
    return await urlSchema.findOneAndUpdate({short_url:shortUrl},{$inc:{clicks:1}})
}
