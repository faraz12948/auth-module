
import { getRackDataById, getRackUnitDataBySVGPath } from '../services/rack';
import { Request, Response } from "express";
import { responseBuilder } from '../helpers';
import { RequestWithQueryStringType } from '../interfaces/commonTypes';

export const getRackDetails = async (req: Request, res: Response) => {
    let racks = await getRackDataById(req.params.id)
    return responseBuilder(racks, res)
}

export const getRackUnitDetails = async (req: RequestWithQueryStringType<{ id: string }>, res: Response) => {
    let racks = await getRackUnitDataBySVGPath(req.query.id)
    return responseBuilder(racks, res)
}