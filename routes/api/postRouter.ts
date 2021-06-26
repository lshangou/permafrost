import express, { Request, Response } from 'express'
import { postController } from '../../controllers/postController'
const postRouter = express.Router()

// Add operations here
postRouter.get('/', postController.readAll)
postRouter.post('/create', postController.create)
postRouter.put('/update/:id', postController.update)
postRouter.delete('/delete/:id', postController.delete)
//Last one, since id is not a recognizable word.
postRouter.get('/:id', postController.read)

//

export default postRouter