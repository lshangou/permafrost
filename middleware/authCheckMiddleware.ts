import { Request, Response, NextFunction } from 'express'
import { User } from '../interfaces/User'

export const authCheckMiddleware = (req: any, res: Response, next: NextFunction) => {

  //TODO: Check auth function
  let user: User = {
    name: "",
    email: ""
  }

  req.user = user

  next()
}