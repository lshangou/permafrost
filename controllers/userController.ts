import { Request, Response } from 'express';
import { User, UserDocument, Users } from '../models/User';

export const userController = {
  create: function(req: Request, res: Response) {
    let newUser = new User(req.body.name, req.body.email)
    Users.create(newUser, (err: any, doc: UserDocument) => {
      if(err) {
        console.log(err)
      }else {
        res.json(doc.name + " Registered.")
      }
    })
  }
} 
