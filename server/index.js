import bodyParser from 'body-parser';
import express from 'express';
import routes from './routes/index.js';
import cors from 'cors';
import services from './services/index.js';

const app = express();
app.disable('x-powered-by');

// make it able to read JSON bodies
app.use(cors());
app.use(bodyParser.json());

app.locals.services = {};

Object.entries(services).forEach(([name, service]) => app.locals.services[name] = new service());

// register the routes
Object.entries(routes).forEach(([path, handler]) => app.use(path, handler));

app.listen(3001, ()=> console.log('listening on 3001'));