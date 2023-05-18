
import bcrypt from "bcrypt";
import generateToken, { verfiyTokenDate } from "../utils/authUtils";
import { getUserByEmail, getUserByUsername, loginUser, registerUser } from "../services/user";
import { RequestWithUser, ResponseWithUser } from '../interfaces/user';
import { Request, Response } from "express";
import { getTokenRepo, updateTokenRepo } from "../repositories/user";
import { validationResult } from 'express-validator';

export const login = async (req: Request, res: ResponseWithUser) => {

    const { username, password } = req.body
    const users = await loginUser(username, password);

    if (users.rows.length === 0) {

        res.status(404).json({
            message: 'User Not Found'
        })
        throw new Error('User Not Found')
    }
    let user: any = users.rows[0];
    if (await bcrypt.compare(password, user.password)) {
        let tkn: any = null;
        let dbToken: any = await getTokenRepo(username);

        if (!verfiyTokenDate(dbToken.rows[0].token)) {
            tkn = generateToken(user.username, user.email);
            await updateTokenRepo({ username, tkn });
        }
        tkn = dbToken.rows[0].token;


        return res.json({
            message: 'Login Successful',
            success: true,
            data: {
                username: user.username, email: user.email, token: tkn
            },
        })
    }
    res.status(401).json({
        message: 'Wrong Password'
    })
    throw new Error('Wrong Password')


}

export const getUserDetails = async (req: RequestWithUser, res: Response) => {
    res.json({
        message: '',
        success: true,
        data: req.user
    })
}

export const register = async (req: Request, res: ResponseWithUser) => {
    const {
        username,
        email,
        password,
    } = req.body
    let isAdmin = false;

    let user = await getUserByEmail(email);
    let uname = await getUserByUsername(username);
    if (user.rows.length !== 0) {

        return res.status(409).json({
            message: 'Email already exist'
        })
        // throw new Error('Email already exist')
    }
    if (uname.rows.length !== 0) {

        return res.status(409).json({
            message: 'Username already exist'
        })
        // throw new Error('Username already exist')
    }

    let tkn = generateToken(username, email);
    await registerUser(username, email, password, isAdmin, tkn);
    res.json({
        message: 'Registered Successfully',
        success: true,
        data: {
            name: username, email, token: tkn
        },
    })
}



