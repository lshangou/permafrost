import express, { Application, Request, Response } from 'express'
import { userController } from '../controllers/userController'
import { authCheckMiddleware } from '../middleware/authCheckMiddleware'
import websiteRouter from './websiteRouter'
import apiRouter from './api'

export function setRoutes(app: Application) {
  app.use('/', websiteRouter)
  app.use('/api', apiRouter)
}