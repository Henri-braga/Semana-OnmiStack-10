import { Router } from 'express';

const routes = new Router();

routes.get('/users', (req, res) => {
  res.json({message: 'Server running'})
})

export default routes;