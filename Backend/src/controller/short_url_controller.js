import { request } from "express";
import { getShortUrl } from "../dao/save_short_url.js";
import shortUrl from "../models/short.model.js";
import User from "../models/user_model.js";
import { createShortUrlWithoutUser, createShortUrlWithUser } from "../services/short_url_service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

export const createShortUrl = wrapAsync(async(req,res)=>{ 
    const {url,slug}=req.body
    console.log({url,slug})
    let shortUrl
    if(req.user){
         shortUrl= await createShortUrlWithUser(url,req.user._id,slug)
    } else{
         shortUrl =await createShortUrlWithoutUser(url)
    }   
     
    res.status(200).json({shortUrl : process.env.APP_URL+shortUrl})

});

export const redirectFromShortUrl = wrapAsync(async (req, res) => {
    const { id } = req.params;
    const url = await getShortUrl(id);
    if (!url) throw new Error("Short URL not found");
    res.redirect(url.full_url);

}); 

export const createCustomUrl=wrapAsync(async(req,res)=>{
    const{url,slug}=req.body
    const shortUrl= await createShortUrlWithUser(url,customUrl)
    res.status(200).json({shortUrl: process.env.APP_URL + shortUrl})
})