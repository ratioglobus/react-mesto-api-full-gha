import { StatusCodes } from 'http-status-codes';
import Jwt from 'jsonwebtoken';
import GeneralErrors from '../utils/GeneralErrors.js';

const { JWT_SECRET, NODE_ENV } = process.env;

const auth = (req, res, next) => {
  let payload;
  try {
    const token = req.headers.authorization;

    if (!token) {
      return next(new GeneralErrors('Необходима авторизация', StatusCodes.UNAUTHORIZED));
    }
    const validToken = token.replace('Bearer ', '');
    payload = Jwt.verify(validToken, NODE_ENV ? JWT_SECRET : 'very-secret-token');
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return next(new GeneralErrors('С токеном что-то не так', StatusCodes.UNAUTHORIZED));
    }

    if (error.name === 'TokenExpiredError') {
      return next(new GeneralErrors('Срок действия токена истек', StatusCodes.UNAUTHORIZED));
    }

    return next(error);
  }
  req.user = payload;
  return next();
};

export default auth;
