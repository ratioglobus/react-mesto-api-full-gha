import { Router } from 'express';
import {
  getUsers,
  getCurrentUser,
  getUserById,
  updateAvatarProfile,
  updateInfoProfile,
} from '../controllers/users.js';
import userIDValidate from '../middlewares/userIDValidate.js';
import userInfoValidate from '../middlewares/userInfoValidate.js';
import userAvatarValidate from '../middlewares/userAvatarValidate.js';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/me', getCurrentUser);
userRouter.get('/:userId', userIDValidate, getUserById);
userRouter.patch('/me', userInfoValidate, updateInfoProfile);
userRouter.patch('/me/avatar', userAvatarValidate, updateAvatarProfile);

export default userRouter;
