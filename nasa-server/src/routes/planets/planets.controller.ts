import { NextFunction, Request, Response } from 'express'
import { planets } from '../../models/planets/planets.model'
// All controllers for planets go here
function getAllPlanets(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json(planets)

}

export {
    getAllPlanets
}