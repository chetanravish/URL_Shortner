import wrapAsync from "../utils/tryCatchWrapper.js";
import { getAllUserUrlsDao,deleteUserUrlDao } from "../dao/user_dao.js";

export const  getAllUserUrls = async(req,res)=>{
    const {_id} = req.user
    const urls = await getAllUserUrlsDao(_id)
    res.status(200).json({message:"success" , urls})
}


export const deleteUserUrl = async (req, res) => {

    const { id } = req.params;

    const userId = req.user._id;

    const deletedUrl = await deleteUserUrlDao(id, userId);

    if (!deletedUrl) {
        return res.status(404).json({
            success: false,
            message: "URL not found or you don't have permission to delete it"
        });
    }

    return res.status(200).json({
        success: true,
        message: "URL deleted successfully"
    });
};
