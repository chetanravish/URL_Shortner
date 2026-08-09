import { getShortUrl } from "../dao/save_short_url.js";
import shortUrl from "../models/short.model.js";
import { createShortUrlWithoutUser } from "../services/short_url_service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

export const createShortUrl = wrapAsync(async(req,res)=>{ 
    console.log(req.body)
   const {url}=req.body
    const shortUrl= await createShortUrlWithoutUser(url)
    res.status(200).json({shortUrl : process.env.APP_URL+shortUrl})

});

export const redirectFromShortUrl = wrapAsync(async (req, res) => {
    const { id } = req.params;
    const url = await getShortUrl(id);
    if (!url) throw new Error("Short URL not found");
    res.redirect(url.full_url);

}); 