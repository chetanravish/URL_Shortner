import { generateNanoId } from "../utils/helper.js"
import { getCustomUrl, saveShortUrl } from "../dao/save_short_url.js";


export const createShortUrlWithoutUser= async(url)=>{
    const shortUrl=  generateNanoId(7)
    if(!shortUrl) throw new Error("Failed to generate short URL")
    await saveShortUrl(shortUrl,url)
    return shortUrl
}

export const createShortUrlWithUser= async(url,userId,slug=null)=>{
    const shortUrl= slug || generateNanoId(7)
    if(slug){
    const exists = await getCustomUrl(slug)
    if(exists) throw new Error("This custom URL already exists")}
    await saveShortUrl(shortUrl,url,userId)
    return shortUrl
}  