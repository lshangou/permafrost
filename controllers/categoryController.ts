import { Request, Response } from 'express';
import { Alert, DefaultDatabaseAlert } from '../helpers/Alert'
import { Categories, Category, CategoryDocument, updatableCategoryProprieties } from '../models/Category';

export const categoryController = {
  // CRUD Functions

  readAll: function(req: any, res: Response) {
    if(req.user) {
      if(req.user.permission >= 2) {
        //needs to be admin
        Categories.find({}, (err: any, docs: CategoryDocument[]) => {
          if(err) {
            let alert: Alert = DefaultDatabaseAlert
            console.log(err)
            res.status(alert.status)
            res.json(alert)
          }else {
            let alert: Alert = {
              status: 200,
              type: "successfulRequest",
              message: "Success",
              description: "Category list gathered.",
              data: docs
            }
            res.status(alert.status)
            res.json(alert)
          }
        })
      }else {
        let alert: Alert = {
          status: 401,
          type: "noPermission",
          message: "Unauthorized",
          description: "User does not have authorization to gather this info.",
          data: undefined
        }
        res.status(alert.status)
        res.json(alert)
      }
    }else {
      let alert: Alert = {
        status: 401,
        type: "noAuth",
        message: "Unauthorized",
        description: "User not logged in.",
        data: undefined
      }
      res.status(alert.status)
      res.json(alert)
    }
  },

  create: function(req: Request, res: Response) {
    let newCategory = new Category(req.body.name, req.body.color)
    Categories.find( { name: newCategory.name }, (err: any, doc: CategoryDocument[]) => {
      if(err) {
        let alert: Alert = DefaultDatabaseAlert
        console.log(err)
        res.status(alert.status)
        res.json(alert)
        return 'error'
      }else if(doc.length > 0) {
        let alert: Alert = {
          status: 400,
          type: "duplicatedName",
          message: "Client Error",
          description: "The category request is already registered in our database."
        }
        res.status(alert.status)
        res.json(alert)
      }else {
        Categories.create(newCategory, (err: any, doc: CategoryDocument) => {
          if(err) {
            let alert: Alert = DefaultDatabaseAlert
            console.log(err)
            res.status(alert.status)
            res.json(alert)
          }else {
            let alert: Alert = {
              status: 200,
              type: "successfulRequest",
              message: "Success",
              description: "Category " + newCategory.name + " successfully registered.",
              data: doc
            }
            res.status(alert.status)
            res.json(alert)
          }
        })
      }
    })
  },

  read: function(req: any, res: Response) {
    if(req.user) {
      if(req.user.permission >= 2) {
        //needs to be admin
        Categories.findById(req.params.id, (err: any, doc: CategoryDocument) => {
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
                description: "Category gathered.",
                data: doc
              }
              res.status(alert.status)
              res.json(alert)
            }else {
              let alert: Alert = {
                status: 404,
                type: "notFound",
                message: "Error",
                description: "Category not Found.",
                data: doc
              }
              res.status(alert.status)
              res.json(alert)
            }
          }
        })
      }else {
        let alert: Alert = {
          status: 401,
          type: "noPermission",
          message: "Unauthorized",
          description: "User does not have authorization to gather this info.",
          data: undefined
        }
        res.status(alert.status)
        res.json(alert)
      }
    }else {
      let alert: Alert = {
        status: 401,
        type: "noAuth",
        message: "Unauthorized",
        description: "User not logged in.",
        data: undefined
      }
      res.status(alert.status)
      res.json(alert)
    }
  },

  update: function(req: any, res: Response) {
    if(req.user) {
      if(req.user.permission >= 2) {
        let updatableItens: updatableCategoryProprieties = {}
        if(req.body.name) { updatableItens.name = req.body.name }
        if(req.body.color) { updatableItens.color = req.body.color }
        Categories.findByIdAndUpdate( { _id: req.params.id }, updatableItens, null, (err: any, doc: any) => {
          if(err) {
            let alert: Alert = DefaultDatabaseAlert
            console.log(err)
            res.status(alert.status)
            res.json(alert)
          }else {
            let alert: Alert = {
              status: 200,
              type: "successfulRequest",
              message: "Success",
              description: "Category " + doc.id + " updated.",
              data: doc
            }
            res.status(alert.status)
            res.json(alert)
          }
        })
      }else {
        let alert: Alert = {
          status: 401,
          type: "noPermission",
          message: "Unauthorized",
          description: "User does not have authorization to gather this info.",
          data: undefined
        }
        res.status(alert.status)
        res.json(alert)
      }
    }else {
      let alert: Alert = {
        status: 401,
        type: "noAuth",
        message: "Unauthorized",
        description: "User not logged in.",
        data: undefined
      }
      res.status(alert.status)
      res.json(alert)
    }
  },

  delete: function(req: any, res: Response) {
    if(req.user) {
      if(req.user.permission >= 2) {
        Categories.findByIdAndDelete( { _id: req.params.id }, null, (err: any, doc: any) => {
          if(err) {
            let alert: Alert = DefaultDatabaseAlert
            console.log(err)
            res.status(alert.status)
            res.json(alert)
          }else {
            let alert: Alert = {
              status: 200,
              type: "successfulRequest",
              message: "Success",
              description: "Category " + doc.name + " deleted.",
              data: doc
            }
            res.status(alert.status)
            res.json(alert)
          }
        })
      }else {
        let alert: Alert = {
          status: 401,
          type: "noPermission",
          message: "Unauthorized",
          description: "User does not have authorization to gather this info.",
          data: undefined
        }
        res.status(alert.status)
        res.json(alert)
      }
    }else {
      let alert: Alert = {
        status: 401,
        type: "noAuth",
        message: "Unauthorized",
        description: "User not logged in.",
        data: undefined
      }
      res.status(alert.status)
      res.json(alert)
    }
  }

} 
