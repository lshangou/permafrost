import { Request, Response } from 'express';
import { User, UserDocument, Users } from '../models/User';

export const userController = {
  // CRUD Functions

  readAll: function(req: Request, res: Response) {
    Users.find({}, (err: any, docs: UserDocument[]) => {
      if(err) {
        console.log(err)
      }else {
        res.json(docs)
      }
    })
  },

  create: function(req: Request, res: Response) {
    let newUser = new User(req.body.name, req.body.email, req.body.password)
    Users.create(newUser, (err: any, doc: UserDocument) => {
      if(err) {
        console.log(err)
      }else {
        res.json(doc.name + " Registered.")
      }
    })
  },

  read: function(req: Request, res: Response) {
    Users.findById(req.params.id, (err: any, doc: UserDocument) => {
      if(err) {
        console.log(err)
      }else {
        res.json(doc)
      }
    })
  },

  update: function(req: Request, res: Response) {
    Users.findByIdAndUpdate( { _id: req.params.id }, req.body, null, (err: any, doc: any) => {
      if(err) {
        console.log(err)
      }else {
        res.json(doc)
      }
    });
  }

} 
