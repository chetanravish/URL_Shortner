import axiosInstance from "../utils/axios_instance"

 export const createShortUrl = async (url,slug) => {
    const { data } = await axiosInstance.post("/api/create", { url,slug });
    return data.shortUrl;
 }