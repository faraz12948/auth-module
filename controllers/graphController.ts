import fs from 'fs';
import {Request, Response} from "express";

const GraphController = () => {
    const getGraphDataById = (req:Request, res:Response) => {
        let locations:any = fs.readFileSync(__dirname + '/../configs/locations.json');
        let location = JSON.parse(locations);
        res.json(location[`${req.params.id}`])
    }

    return {
        getGraphDataById
    }
}

export default GraphController