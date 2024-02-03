import { Router } from 'express';
import {
  getCards,
  createCard,
  likeCard,
  dislikeCard,
  deleteCard,
} from '../controllers/cards.js';
import cardInfoValidate from '../middlewares/cardInfoValidate.js';
import cardIDValidate from '../middlewares/cardIDValidate.js';

const cardRouter = Router();

cardRouter.get('/', getCards);
cardRouter.post('/', cardInfoValidate, createCard);
cardRouter.put('/:cardId/likes', cardIDValidate, likeCard);
cardRouter.delete('/:cardId/likes', cardIDValidate, dislikeCard);
cardRouter.delete('/:cardId', cardIDValidate, deleteCard);

export default cardRouter;
