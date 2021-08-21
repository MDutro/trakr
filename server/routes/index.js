/**
 * The routes to be mounted to the express app, each key is the path
 */

import { Router } from "express";
import toDoRouter from './toDo.js';
const healthRouter = new Router();
healthRouter.get('/', (_, res) => res.sendStatus(200));

export const routes = {
    '/health': healthRouter,
    '/todos': toDoRouter
};

export default routes;