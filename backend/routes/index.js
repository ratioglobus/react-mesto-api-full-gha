import { Router } from 'express';
import { errors } from 'celebrate';

import userRouter from './users.js';
import cardRouter from './cards.js';
import { createUser, login } from '../controllers/users.js';
import auth from '../middlewares/auth.js';
import userAuthValidate from '../middlewares/userAuthValidate.js';
import generalErrorHandler from '../utils/generalErrorHandler.js';
import GeneralErrors from '../utils/GeneralErrors.js';
import { requestLogger, errorLogger } from '../middlewares/logData.js';

const router = Router();

router.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', userAuthValidate, login);
router.post('/signup', userAuthValidate, createUser);
router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);

router.use('*', auth, (req, res, next) => {
  next(GeneralErrors.NotFound('Страница не найдена'));
});

router.use(errorLogger);
router.use(errors());
router.use(generalErrorHandler);

export default router;
