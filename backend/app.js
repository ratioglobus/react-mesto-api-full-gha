import express, { json } from 'express';
import 'dotenv/config';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes/index.js';
import allowedCors from '../utils/const.js';

const { PORT = 3000 } = process.env;
const BASE_URL_DB = 'mongodb://localhost:27017/mestodb';
const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

const app = express();

app.use(cors());
app.use(helmet());

app.use('*', (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
});

app.use(json());

async function startApp() {
  try {
    await mongoose.connect(BASE_URL_DB);
    console.log('Connection database - OK');

    app.use(router);
    app.listen(PORT, () => {
      console.log('Server is working on port', PORT);
    });
  } catch (error) {
    console.log('Error', error);
  }
}

startApp();
