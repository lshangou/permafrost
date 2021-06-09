import express, { Request, Response } from 'express'
import { authCheckMiddleware } from '../../middleware/authCheckMiddleware'
import authRouter from './authRouter'
import userRouter from './userRouter'

const apiRouter = express.Router()

apiRouter.use(authCheckMiddleware)

apiRouter.get('/', (req: Request, res: Response) => {
  res.send("Página de documentação da api maybe. (nao precisa de SEO)")
})

// Add routes here
//apiRouter.use(path, routerFile)
apiRouter.use('/user', userRouter)
apiRouter.use('/auth', authRouter)

//

export default apiRouter