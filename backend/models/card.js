import mongoose from 'mongoose';
import URLExp from '../utils/const.js';

const cardScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Поле является обязательным'],
      minlength: [2, 'Минимальная длина строки 2 символа'],
      maxlength: [30, 'Минимальная длина строки 30 символов'],
    },
    link: {
      type: String,
      required: [true, 'Поле является обязательным'],
      match: [URLExp, 'URL некорректен'],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Поле является обязательным'],
    },
    likes: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
        },
      ],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

export default mongoose.model('card', cardScheme);
