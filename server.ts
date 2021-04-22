import express, { Request, Response } from 'express'
import { userController } from './controllers/userController'
import { connectDatabase } from './database/connection';

connectDatabase('mongodb+srv://shangou:pao123@cluster0.9k9ra.mongodb.net')

const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

import { authCheckMiddleware } from './middleware/authCheckMiddleware'
app.use(authCheckMiddleware)

app.get('/', (req: any, res: Response) => {
  console.log(req.user)
  res.send('Hello World!')
})

app.post('/user/create', (req: Request, res: Response) => {
  userController.create(req, res)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})