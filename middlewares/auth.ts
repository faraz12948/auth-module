
const jwt = require('jsonwebtoken');
const asyncHandler = require("express-async-handler");
import { getTokenRepo, getUserFromEmail } from "../repositories/user";
import { verfiyTokenDate, checkAuthHeader, verifyToken } from "../utils/authUtils";
const { ACCESS_TOKEN_SECRET } = process.env
import { ResponseWithUser, DBToken, RequestWithToken } from "../interfaces/user";
import { NextFunction } from 'express';

export const authorizedUser = asyncHandler(async (req: RequestWithToken, res: ResponseWithUser, next: NextFunction) => {

    const { token, decoded } = await verifyToken(req, ACCESS_TOKEN_SECRET as string);
    if (checkAuthHeader(req)) {

        try {

            const users = await getUserFromEmail(decoded.email);
            if (!users.rows.length) {
                res.status(401)
                throw new Error('Invalid Token')

            }
            req.user = users.rows[0]

            if (verfiyTokenDate(token)) {

                next()
            }


        } catch (e: any) {
            console.error(e)
            res.status(401)
            throw new Error(e.message || 'Authorization failed')
        }
    }
    if (!token) {
        res.status(401)
        throw new Error('not authorized')
    }
})
export const authorizedUserdb = asyncHandler(async (req: RequestWithToken, res: ResponseWithUser, next: NextFunction) => {

    const { token, decoded } = await verifyToken(req, ACCESS_TOKEN_SECRET as string);
    if (checkAuthHeader(req)) {
        try {

            let dbToken: DBToken = await getTokenRepo(decoded.username);

            if (token !== dbToken.rows[0].token) {

                res.status(401)
                throw new Error('Invalid Token')

            }
            next()

        } catch (e: any) {
            console.error(e)
            res.status(401)
            throw new Error(e.message || 'Authorization failed')
        }
    }
    if (!token) {
        res.status(401)
        throw new Error('not authorized')
    }
})
