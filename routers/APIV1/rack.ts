import express, {Request, Response} from 'express'
import {getRackDetails, getRackUnitDetails} from '../../controllers/rackController';
const router = express.Router()

router.get('/details/:id', getRackDetails)
router.get('/rack-unit', getRackUnitDetails)

export default router