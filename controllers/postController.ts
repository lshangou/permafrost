import { Request, Response } from 'express';
import { Alert, DefaultDatabaseAlert } from '../helpers/Alert'
import { Post, PostDocument, Posts, updatablePostProprieties } from '../models/Post';

export const postController = {
  // CRUD Functions

  readAll: function(req: any, res: Response) {
    Posts.find({}, (err: any, docs: PostDocument[]) => {
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
          description: "Post list gathered.",
          data: docs
        }
        res.status(alert.status)
        res.json(alert)
      }
    })
  },

  create: function(req: any, res: Response) {
    if(req.user) {
      if(req.user.permission >= 1) {
        //needs to be poster
        let newPost = new Post(req.body.title, req.body.author, new Date().toString(), req.body.content, req.body.categories, req.body.thumbnail)
        Posts.create(newPost, (err: any, doc: PostDocument) => {
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
              description: "Post " + newPost.title + " successfully registered.",
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

  read: function(req: any, res: Response) {
    Posts.findById(req.params.id, (err: any, doc: PostDocument) => {
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
            description: "Post gathered.",
            data: doc
          }
          res.status(alert.status)
          res.json(alert)
        }else {
          let alert: Alert = {
            status: 404,
            type: "notFound",
            message: "Error",
            description: "Post not Found.",
            data: doc
          }
          res.status(alert.status)
          res.json(alert)
        }
      }
    })
  },

  update: function(req: any, res: Response) {
    if(req.user) {
      if(req.user.permission >= 1) {
        let updatableItens: updatablePostProprieties = {}
        if(req.body.title) { updatableItens.title = req.body.title }
        if(req.body.date) { updatableItens.date = req.body.date }
        if(req.body.content) { updatableItens.content = req.body.content }
        if(req.body.categories) { updatableItens.categories = req.body.categories }
        if(req.body.thumbnail) { updatableItens.thumbnail = req.body.thumbnail }
        if(req.body.views) { updatableItens.views = req.body.views }
        Posts.findByIdAndUpdate( { _id: req.params.id }, updatableItens, null, (err: any, doc: any) => {
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
                description: "Post " + doc.id + " updated.",
                data: doc
              }
              res.status(alert.status)
              res.json(alert)
            }else {
              let alert: Alert = {
                status: 404,
                type: "notFound",
                message: "Error",
                description: "Post not Found.",
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

  delete: function(req: any, res: Response) {
    if(req.user) {
      if(req.user.permission >= 1) {
        Posts.findByIdAndDelete( { _id: req.params.id }, null, (err: any, doc: any) => {
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
                description: "Post " + doc.id + " updated.",
                data: doc
              }
              res.status(alert.status)
              res.json(alert)
            }else {
              let alert: Alert = {
                status: 404,
                type: "notFound",
                message: "Error",
                description: "Post not Found.",
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
  }

} 
