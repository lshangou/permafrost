import express, { Request, Response } from 'express'
const websiteRouter = express.Router()


// Add default pages here
websiteRouter.get('/', (req: Request, res: Response) => {
  res.send("Hello World. I'm in an website route. (/)")
})

websiteRouter.get('/about', (req: Request, res: Response) => {
  res.send("About Page. I'm in an website route (/about)")
})

//

export default websiteRouter