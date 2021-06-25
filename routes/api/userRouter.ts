import express, { Request, Response } from 'express'
import { userController } from '../../controllers/userController'
const userRouter = express.Router()

// Add operations here

// Old way
// userRouter.get('/', (req: Request, res: Response) => {
//   userController.readAll(req, res)
// })
userRouter.get('/', userController.readAll)
userRouter.post('/create', userController.create)
userRouter.put('/update/:id', userController.update)
userRouter.delete('/delete/:id', userController.delete)
//Last one, since id is not a recognizable word.
userRouter.get('/:id', userController.read)

//

export default userRouter