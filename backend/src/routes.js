import { Router } from 'express'

import SouthersController from './app/controllers/SouthersController'
import SoutherSearchController from './app/controllers/SoutherSearchController'

const routes = new Router()

routes.get('/southers', SouthersController.index)
routes.post('/southers', SouthersController.store)
routes.get('/search-southers', SoutherSearchController.index)

export default routes
