import express, { Request, Response } from 'express'
import { categoryController } from '../../controllers/categoryController'
const categoryRouter = express.Router()

// Add operations here
categoryRouter.get('/', categoryController.readAll)
categoryRouter.post('/create', categoryController.create)
categoryRouter.put('/update/:id', categoryController.update)
categoryRouter.delete('/delete/:id', categoryController.delete)
//Last one, since id is not a recognizable word.
categoryRouter.get('/:id', categoryController.read)

//

export default categoryRouter