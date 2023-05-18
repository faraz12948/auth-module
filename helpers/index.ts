import { Response } from "express"

export const responseBuilder = (data:any, res:Response, code=200) =>{
    return res.status(code).json(data)
}