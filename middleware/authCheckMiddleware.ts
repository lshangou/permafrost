import { Request, Response, NextFunction } from 'express'
import { Alert, DefaultDatabaseAlert } from '../helpers/Alert'
import { User, UserDocument, Users } from '../models/User'

export const authCheckMiddleware = (req: any, res: Response, next: NextFunction) => {

  // TODO: Check auth function
  let user = null
  if(req.cookies.userCookie && req.cookies.userEmail) {
    //Check if the cookie is valid
    Users.findOne({email: req.cookies.userEmail}, (err: any, doc: UserDocument) => {
      if(err) {
        let alert: Alert = DefaultDatabaseAlert
        console.log(err)
        res.status(alert.status)
        res.json(alert)
      }else {
        if(doc) {
          user = doc
          req.user = user
          console.log("User " + req.user.name +" acessing " + req.originalUrl)
          next()
        } else {
          req.user = undefined
          console.log("Anonymous user acessing " + req.originalUrl)
          next()
        }
      }
    })
  }else {
    req.user = undefined
    console.log("Anonymous user acessing " + req.originalUrl)
    next()
  }
}