import express, { Request, Response } from 'express'
import { connectDatabase } from './database/connection';
import { setRoutes } from './routes';

connectDatabase('mongodb+srv://shangou:pao123@cluster0.9k9ra.mongodb.net')

const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/static', express.static('public'));

setRoutes(app)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})