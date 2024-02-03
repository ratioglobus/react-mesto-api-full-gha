import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import Card from '../models/card.js';
import GeneralErrors from '../utils/GeneralErrors.js';

export const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    return res.send(cards);
  } catch (error) {
    return next(new GeneralErrors());
  }
};

export const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const newCard = await new Card({ name, link, owner: req.user._id });
    return res.status(StatusCodes.CREATED).send(await newCard.save());
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return next(GeneralErrors.BadRequest('При создании карточки переданы некорректные данные'));
    }
    return next(new GeneralErrors());
  }
};

export const likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).orFail();
    return res.send(card);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return next(GeneralErrors.BadRequest('При создании карточки переданы некорректные данные'));
    }
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      return next(GeneralErrors.NotFound('Такая карточка не найдена'));
    }
    return next(new GeneralErrors());
  }
};

export const dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).orFail();
    return res.send(card);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return next(GeneralErrors.BadRequest('При создании карточки переданы некорректные данные'));
    }
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      return next(GeneralErrors.NotFound('Такая карточка не найдена'));
    }
    return next(new GeneralErrors());
  }
};

export const deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId).orFail();
    if (card.owner.toString() !== req.user._id) {
      return next(GeneralErrors.Forbidden('Вы не можете удалять карточки других пользователей'));
    }
    return Card.deleteOne(card)
      .orFail()
      .then(() => {
        res.send({ message: 'Карточка удалена' });
      });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return next(GeneralErrors.BadRequest('При создании карточки переданы некорректные данные'));
    }
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      return next(GeneralErrors.NotFound('Такая карточка не найдена'));
    }
    return next(new GeneralErrors());
  }
};
