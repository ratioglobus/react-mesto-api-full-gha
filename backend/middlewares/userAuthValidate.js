import { Joi, celebrate } from 'celebrate';
import URLExp from '../utils/const.js';

export default celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    avatar: Joi.string().pattern(new RegExp(URLExp)),
  }),
});
