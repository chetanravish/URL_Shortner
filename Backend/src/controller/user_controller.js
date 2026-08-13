import { getShortUrl } from "../dao/save_short_url.js";
import wrapAsync from "../utils/tryCatchWrapper.js";
import { getAllUserUrlsDao } from "../dao/user_dao.js";

export const  getAllUserUrls = wrapAsync(async(req,res)=>{
    const {_id} = req.user
    const urls = await getAllUserUrlsDao(_id)
    res.status(200).json({message:"success" , urls})
})