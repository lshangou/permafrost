import { Request, Response } from 'express';
import { Alert, DefaultDatabaseAlert } from '../helpers/Alert';
import { sha1 } from '../helpers/sha1';
import { authSession } from '../models/authSession';
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
          // Create new Cookie for login, expiring in one month
          let cookie = req.cookies.userCookie
          let authSessionsUpdated = []
          doc.authSessions.forEach(authSession => {
            if(authSession.cookie != cookie) {
              authSessionsUpdated.push(authSession)
            }
          });
          var randomNumber=Math.random().toString();
          randomNumber=randomNumber.substring(2,randomNumber.length);
          let expirationDate = new Date(Date.now() + 30 * 24 * 3600000)
          let userAgent = req.get('User-Agent')
          if(!userAgent) {
            userAgent = 'undefined'
          }
          res.cookie('userCookie', randomNumber, { expires: expirationDate, httpOnly: true }) //30 24h days
          .cookie('userEmail', doc.email, { expires: expirationDate, httpOnly: true })
          authSessionsUpdated.push({
            cookie: randomNumber,
            expirationDate: expirationDate.toString(),
            userDevice: userAgent
          })
          Users.findByIdAndUpdate({ _id: doc._id }, {authSessions: authSessionsUpdated}, null, (err: any, doc: any) => {
            // console.log(doc)
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
                description: "User auth complete.",
                data: doc
              }
              res.status(alert.status)
              res.json(alert)
            }
          })
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
  },

  logout: function(req: Request, res: Response) {
    if(req.cookies) {
      Users.findOne({email: req.cookies.userEmail}, (err: any, doc: UserDocument) => {
        if(err) {
          let alert: Alert = DefaultDatabaseAlert
          console.log(err)
          res.status(alert.status)
          res.json(alert)
        }else {
          if(doc) {
            let cookie = req.cookies.userCookie
            let authSessionsUpdated: authSession[] = []
            doc.authSessions.forEach(authSession => {
              if(authSession.cookie != cookie) {
                authSessionsUpdated.push(authSession)
              }
            });
            Users.findByIdAndUpdate({ _id: doc._id }, {authSessions: authSessionsUpdated}, null, (err: any, doc: any) => {
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
                  description: "User logged out.",
                  data: doc
                }
                res.status(alert.status)
                res.json(alert)
              }
            })
          }else {
            let alert: Alert = {
              status: 404,
              type: "notFound",
              message: "Error",
              description: "There is no user with this credentials, reseting cookies.",
              data: doc
            }
            res.clearCookie('userCookie')
            res.clearCookie('userEmail')
            res.status(alert.status)
            res.json(alert)
          }
        }
      })
      res.clearCookie('userCookie')
      res.clearCookie('userEmail')
    }
  }

} 
