import express from 'express'
import { authMiddleware } from '../middleware/auth_middleware.js';
import { getAllUserUrls } from '../controller/user_controller.js';

const router = express.Router();

router.post('/urls',authMiddleware, getAllUserUrls);



export default router;
