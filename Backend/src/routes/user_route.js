import express from 'express'
import { authMiddleware } from '../middleware/auth_middleware.js';
import { getAllUserUrls,deleteUserUrl } from '../controller/user_controller.js';
import wrapAsync from '../utils/tryCatchWrapper.js'

const router = express.Router();

router.get('/urls',authMiddleware, wrapAsync(getAllUserUrls));
router.delete( "/urls/:id",authMiddleware,wrapAsync(deleteUserUrl));


export default router;
