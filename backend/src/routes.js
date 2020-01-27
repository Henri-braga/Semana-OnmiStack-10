import { Router } from 'express'

import SouthersController from './app/controllers/SouthersController'
import SoutherSearchController from './app/controllers/SouthersSearchController'

const routes = new Router()

routes.get('/southers', SouthersController.index)
routes.get('/southers/:id', SouthersController.show)
routes.post('/southers', SouthersController.store)
routes.patch('/southers/:id', SouthersController.update)
routes.delete('/southers/:id', SouthersController.delete)

routes.get('/search-southers', SoutherSearchController.index)

export default routes
