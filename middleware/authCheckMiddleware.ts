import { Request, Response, NextFunction } from 'express'
import { User } from '../models/User'

export const authCheckMiddleware = (req: any, res: Response, next: NextFunction) => {

  //TODO: Check auth function
  // let user: User = {
  //   name: "Lucas",
  //   email: "lucas@email.com"
  // }

  // req.user = user

  // console.log("Essa rota pertece à api.")

  next()
}