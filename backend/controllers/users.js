import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import generateToken from '../utils/jwt.js';
import GeneralErrors from '../utils/GeneralErrors.js';

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email })
      .select('+password')
      .orFail(() => {
        throw new GeneralErrors.Unauthorized('Введены неправильная почта или пароль');
      });
    const matched = await bcrypt.compare(String(password), user.password);
    if (!matched) {
      throw new GeneralErrors.Unauthorized('Введены неправильная почта или пароль');
    }
    const token = generateToken({ _id: user._id });
    return res.send({ token });
  } catch (error) {
    if (error.message === 'NotAutanticate') {
      return next(GeneralErrors.Unauthorized('Введены неправильная почта или пароль'));
    }
    return next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const newUser = await bcrypt
      .hash(req.body.password, 10)
      .then((hash) => User.create({ ...req.body, password: hash }));

    return res.status(StatusCodes.CREATED).send({
      name: newUser.name,
      about: newUser.about,
      avatar: newUser.avatar,
      _id: newUser._id,
      email: newUser.email,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return next(new GeneralErrors.BadRequest('Введены неправильная почта или пароль'));
    }
    if (error.code === 11000) {
      return next(new GeneralErrors.Conflict('Пользователь с таким адресом электронной почты уже существует'));
    }
    return next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.send(users);
  } catch (error) {
    return next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail();
    return res.status(StatusCodes.OK).send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      return next(new GeneralErrors.NotFound(`Пользователь по указанному ID ${req.params.id} не найден`));
    }
    return next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).orFail();
    return res.status(StatusCodes.OK).send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return next(new GeneralErrors.BadRequest('Передан невалидный ID'));
    }
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      return next(new GeneralErrors.NotFound(`Пользователь по указанному ID ${req.params.id} не найден`));
    }
    return next(error);
  }
};

export const updateAvatarProfile = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const updatedInfo = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    ).orFail();
    return res.json(updatedInfo);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return next(new GeneralErrors.BadRequest('Переданы неверные данные'));
    }
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      return next(new GeneralErrors.NotFound('Такого пользователя не существует'));
    }
    return next(error);
  }
};

export const updateInfoProfile = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const updatedInfo = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    ).orFail();
    return res.json(updatedInfo);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return next(new GeneralErrors.BadRequest('Переданы некорректные данные при создании пользователя'));
    }
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      return next(new GeneralErrors.NotFound(`Пользователь по указанному ID ${req.user._id} не найден`));
    }
    return next(error);
  }
};
