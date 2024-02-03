import { Joi, celebrate } from 'celebrate';
import URLExp from '../utils/const.js';

export default celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(new RegExp(URLExp)),
  }),
});
