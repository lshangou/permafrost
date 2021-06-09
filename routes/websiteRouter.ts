import express, { Request, Response } from 'express'
import { pageController } from '../controllers/pageController'
import { authCheckMiddleware } from '../middleware/authCheckMiddleware'
const websiteRouter = express.Router()

// Add default pages here
websiteRouter.use(authCheckMiddleware)
websiteRouter.get('/', (req: Request, res: Response) => {
  pageController.render(req, res, 'index')
})
websiteRouter.get('/login', (req: Request, res: Response) => {
  pageController.render(req, res, 'entrance/login')
})

websiteRouter.get('/about', (req: Request, res: Response) => {
  res.send("About Page. I'm in an website route (/about)")
})


//

export default websiteRouter