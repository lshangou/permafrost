import express, { Request, Response } from 'express'
import { authController } from '../../controllers/authController'
const authRouter = express.Router()

// Add operations here

authRouter.post('/', (req: Request, res: Response) => {
  authController.auth(req, res)
})

//

export default authRouter