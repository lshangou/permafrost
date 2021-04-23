import express, { Request, Response } from 'express'
import { userController } from '../../controllers/userController'
const userRouter = express.Router()

// Add operations here

userRouter.get('/', (req: Request, res: Response) => {
  userController.readAll(req, res)
})
userRouter.post('/create', (req: Request, res: Response) => {
  userController.create(req, res)
})
userRouter.put('/update/:id', (req: Request, res: Response) => {
  userController.update(req, res)
})
// userRouter.delete('/delete', (req: Request, res: Response) => {
//   userController.delete(req, res)
// })
//Last one, since id is not a recgnizable word.
userRouter.get('/:id', (req: Request, res: Response) => {
  userController.read(req, res)
})

//

export default userRouter