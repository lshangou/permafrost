import express, { Request, Response } from 'express'
import { authController } from '../../controllers/authController'
const authRouter = express.Router()

// Add operations here
authRouter.post('/', authController.auth)
authRouter.post('/logout', authController.logout)
authRouter.post('/logoutall', authController.logoutAll)
//TODO: Add a logout from all machines, witch deletes all cokies.

//

export default authRouter