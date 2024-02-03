import Jwt from 'jsonwebtoken';
import GeneralErrors from '../utils/GeneralErrors.js';

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  let payload;

  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return next(GeneralErrors.Unauthorized('Необходима авторизация'));
    }
    const token = authorization.replace('Bearer ', '');
    payload = Jwt.verify(token, NODE_ENV ? JWT_SECRET : 'very-secret-token');
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
