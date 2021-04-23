import express, { Application, Request, Response } from 'express'
import { userController } from '../controllers/userController'
import { authCheckMiddleware } from '../middleware/authCheckMiddleware'
import websiteRouter from './websiteRouter'
import apiRouter from './api'

export function setRoutes(app: Application) {

  // app.get('/', (req: any, res: Response) => {
  //   res.send('Hello World!')
  // })

  app.use('/', websiteRouter)

  // app.post('/user/create', (req: Request, res: Response) => {
  //   userController.create(req, res)
  // })
  
  app.use('/api', apiRouter)
}