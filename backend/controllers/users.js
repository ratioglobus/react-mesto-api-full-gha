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
        throw new Error('NotAutanticate');
      });
    const matched = await bcrypt.compare(String(password), user.password);
    if (!matched) {
      throw new Error('NotAutanticate');
    }
    const token = generateToken({ _id: user._id });
    return res.send({ token });
  } catch (error) {
    if (error.message === 'NotAutanticate') {
      return next(GeneralErrors.Unauthorized('Неправильные почта или пароль'));
    }

    return next(new GeneralErrors());
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.send(users);
  } catch (error) {
    return next(new GeneralErrors());
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail();
    return res.status(StatusCodes.OK).send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return next(GeneralErrors.BadRequest('Переданы неверные данные'));
    }
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      return next(GeneralErrors.NotFound('Такого пользователя не существует'));
    }

    return next(new GeneralErrors());
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).orFail();
    return res.status(StatusCodes.OK).send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return next(GeneralErrors.BadRequest('Переданы неверные данные'));
    }
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      return next(GeneralErrors.NotFound('Такого пользователя не существует'));
    }

    return next(new GeneralErrors());
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
      return next(GeneralErrors.BadRequest('При создании пользователя переданы неверные данные'));
    }

    if (error.code === 11000) {
      return next(GeneralErrors.Conflict('Пользователь уже существует'));
    }

    return next(new GeneralErrors());
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
      return next(GeneralErrors.BadRequest('Переданы неверные данные'));
    }
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      return next(GeneralErrors.NotFound('Такого пользователя не существует'));
    }
    return next(new GeneralErrors());
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
      return next(GeneralErrors.BadRequest('Переданы неверные данные'));
    }
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      return next(GeneralErrors.NotFound('Такого пользователя не существует'));
    }

    return next(new GeneralErrors());
  }
};
