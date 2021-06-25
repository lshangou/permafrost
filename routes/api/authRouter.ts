import express, { Request, Response } from 'express'
import { authController } from '../../controllers/authController'
const authRouter = express.Router()

// Add operations here
authRouter.post('/', authController.auth)
//TODO: Add a logout from all machines, witch deletes all cokies.

//

export default authRouter