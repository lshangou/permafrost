import { Request, Response } from 'express';
import { Alert, DefaultDatabaseAlert } from '../helpers/Alert';
import { sha1 } from '../helpers/sha1';
import { UserDocument, Users } from '../models/User';

export const authController = {

  auth: function(req: Request, res: Response) {
    Users.findOne( { email: req.body.email, password: sha1(req.body.password) }, (err: any, doc: UserDocument) => {
      if(err) {
        let alert: Alert = DefaultDatabaseAlert
        console.log(err)
        res.status(alert.status)
        res.json(alert)
      }else {
        if(doc) {
          let alert: Alert = {
            status: 200,
            type: "successfulRequest",
            message: "Success",
            description: "User auth complete.",
            data: doc
          }
          res.status(alert.status)
          res.json(alert)
        }else {
          let alert: Alert = {
            status: 202,
            type: "incorrectCredentials",
            message: "Error",
            description: "Incorrect username or password.",
            data: doc
          }
          res.status(alert.status)
          res.json(alert)
        }
      }
    })
  }

} 
