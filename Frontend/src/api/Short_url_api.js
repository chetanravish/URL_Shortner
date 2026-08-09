import axiosInstance from "../utils/axios_instance"

 export const createShortUrl = async (url) => {
    const { data } = await axiosInstance.post("/api/create", { url });
    return data.shortUrl;
 }