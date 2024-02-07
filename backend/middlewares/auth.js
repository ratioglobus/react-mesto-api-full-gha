import Jwt from 'jsonwebtoken';
import GeneralErrors from '../utils/GeneralErrors.js';

const { JWT_SECRET, NODE_ENV } = process.env;

const auth = (req, res, next) => {
  let payload;
  try {
    const token = req.headers.authorization;

    if (!token) {
      return next(GeneralErrors.Unauthorized('Необходима авторизация'));
    }
    const validToken = token.replace('Bearer ', '');
    payload = Jwt.verify(validToken, NODE_ENV ? JWT_SECRET : 'very-secret-token');
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return next(GeneralErrors.Unauthorized('С токеном что-то не так'));
    }

    if (error.name === 'TokenExpiredError') {
      return next(GeneralErrors.Unauthorized('Срок действия токена истек'));
    }

    return next(error);
  }
  req.user = payload;
  return next();
};

export default auth;
