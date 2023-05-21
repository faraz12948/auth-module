
import express from "express";
import {
    login,
    getUserDetails,
    register,
    updatePassword,
    resetPassword,

} from "../../controllers/userController";
import { authorizedUser, authorizedUserdb } from "../../middlewares/auth";
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    handler: (req: any, res: any) => {
        res.status(429).json({
            message: 'Too many login attempts, please try again later',
        });
    }
});



const router = express.Router()

router.route('/').get(authorizedUser, authorizedUserdb, getUserDetails)
router.route('/').post(limiter, register)
router.post('/login', limiter, login)
router.post('/forgot-password', updatePassword)
router.post('/reset-password/:token', resetPassword)


export default router;