import { Router } from 'express';

import NoteCrontoller from './app/controllers/NoteController';
import ProjectController from './app/controllers/ProjectController';

const routes = new Router();

routes.get('/notes', NoteCrontoller.index);
routes.post('/notes', NoteCrontoller.store);
routes.put('/notes/:id', NoteCrontoller.update);
routes.delete('/notes/:id', NoteCrontoller.delete);

routes.get('/projects', ProjectController.index);
routes.post('/projects', ProjectController.store);
routes.put('/projects/:id', ProjectController.update);
routes.delete('/projects/:id', ProjectController.delete);

export default routes;
