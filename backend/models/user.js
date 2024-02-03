import mongoose from 'mongoose';
import validator from 'validator';
import URLExp from '../utils/const.js';

const userScheme = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Поле является обязательным'],
      unique: true,
      validator: {
        validator: (v) => validator.isEmail(v),
        message: 'Неправильный формат',
      },
    },
    password: {
      type: String,
      required: [true, 'Поле является обязательным'],
      select: false,
    },
    name: {
      type: String,
      minlength: [2, 'Минимальная длина 2 символа'],
      maxlength: [30, 'Максимальная длина строки 30 символов'],
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minlength: [2, 'Минимальная длина пароля 2 символа'],
      maxlength: [30, 'Максимальная длина строки 30 символов'],
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      default:
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      match: [URLExp, 'URL некорректен'],
    },
  },
  { versionKey: false },
);

export default mongoose.model('user', userScheme);
