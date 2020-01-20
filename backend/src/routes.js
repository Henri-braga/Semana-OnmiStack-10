import { Router } from 'express'

import DevsController from './app/controllers/DevsController'
import SearchController from './app/controllers/SearchController'

const routes = new Router()

routes.get('/devs', DevsController.index)
routes.post('/devs', DevsController.store)

routes.get('/search', SearchController.index)

export default routes
