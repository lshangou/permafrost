import express from 'express'
const app = express()
const port = 3000

import { authCheckMiddleware } from './middleware/authCheckMiddleware'
app.use(authCheckMiddleware)

app.get('/', (req: any, res) => {
  console.log(req.user)
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})