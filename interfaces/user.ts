import { Request, Response } from "express";

export interface RequestWithUser extends Request {
    user?: { username: string, email: string };
}

export interface ResponseWithUser extends Response {
    user?: { username: string, email: string, token: string };
}
interface Token {
    token: string;
}
export interface DBToken {
    rows: Array<Token>;
}
export interface AuthError {
    messege: string;
}
export interface RequestWithToken extends Request {
    headers: {
        authorization: string;
    };
    user?: { username: string, email: string, token: string };
}



// Repositories data types

export interface signUpType {
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
    tkn: string;
}
export interface signInType {
    username: string;
    password: string;

}
export interface commonAuthType {
    username?: string;
    email?: string;
    password?: string;
    isAdmin?: boolean;
    tkn?: string;
}