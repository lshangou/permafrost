import { Request, Response } from 'express';
import { Alert, DefaultDatabaseAlert } from '../helpers/Alert'
import { updatableUserProprieties, User, UserDocument, Users } from '../models/User';

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
    let newUser = new User(req.body.name, req.body.email, req.body.password, 0)
    Users.find( { email: newUser.email }, (err: any, doc: UserDocument[]) => {
      if(err) {
        let alert: Alert = DefaultDatabaseAlert
        res.status(alert.status)
        res.json(alert)
        return 'error'
      }else if(doc.length > 0) {
        let alert: Alert = {
          status: 400,
          type: "duplicatedEmail",
          message: "Client Error",
          description: "The e-mail request is already registered in our database."
        }
        res.status(alert.status)
        res.json(alert)
      }else {
        Users.create(newUser, (err: any, doc: UserDocument) => {
          if(err) {
            console.log(err)
            let alert: Alert = DefaultDatabaseAlert
            res.status(alert.status)
            res.json(alert)
          }else {
            doc.password = "Who knows? 🤷‍♀️"
            let alert: Alert = {
              status: 200,
              type: "successfulRequest",
              message: "Success",
              description: "User " + newUser.name + " successfully registered.",
              data: doc
            }
            res.status(alert.status)
            res.json(alert)
          }
        })
      }
    })
  },

  read: function(req: Request, res: Response) {
    Users.findById(req.params.id, (err: any, doc: UserDocument) => {
      if(err) {
        let alert: Alert = DefaultDatabaseAlert
        res.status(alert.status)
        res.json(alert)
      }else {
        let alert: Alert = {
          status: 200,
          type: "successfulRequest",
          message: "Success",
          description: "User list gathered.",
          data: doc
        }
        res.status(alert.status)
        res.json(alert)
      }
    })
  },

  update: function(req: Request, res: Response) {
    let updatableItens: updatableUserProprieties = {}
    if(req.body.name) { updatableItens.name = req.body.name }
    if(req.body.email) { updatableItens.email = req.body.email }
    if(req.body.password) { updatableItens.password = req.body.password }
    Users.findByIdAndUpdate( { _id: req.params.id }, updatableItens, null, (err: any, doc: any) => {
      if(err) {
        console.log(err)
      }else {
        res.json(doc)
      }
    });
  },

  delete: function(req: Request, res: Response) {
    Users.findByIdAndDelete( { _id: req.params.id }, null, (err: any, doc: any) => {
      if(err) {
        console.log(err)
      }else {
        res.json(doc.name + " deleted.")
      }
    })
  }

} 
