import {Request, Response, NextFunction} from 'express'
import { addLaunch, getAllLaunches} from '../../models/launches/launches.model'

function httpGetAllLaunches (req: Request, res: Response, next: NextFunction) {
    return res.status(200).json(getAllLaunches())
}
//What do we return in a post request????
function httpAddLaunch(req: Request, res: Response, next: NextFunction) {
    return res.status(201).json(addLaunch(req.body))
}

export {
    httpAddLaunch,
    httpGetAllLaunches
}