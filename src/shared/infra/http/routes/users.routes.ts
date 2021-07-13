import { Router } from 'express';
import multer from 'multer';
import { useContainer } from 'typeorm';

import uploadConfig from '@config/upload';
import { CreateUserController } from '@modules/accounts/userCases/createUser/CreateUserController';
import { ProfileUserController } from '@modules/accounts/userCases/profileUserUseCase/ProfileUserController';
import { UpdateAvatarController } from '@modules/accounts/userCases/updateUserAvatar/UpdateUserController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);
const createUserController = new CreateUserController();
const updateAvatarController = new UpdateAvatarController();
const profileUserController = new ProfileUserController();

usersRoutes.post('/', createUserController.handle);

usersRoutes.patch(
  '/avatar',
  uploadAvatar.single('avatar'),
  ensureAuthenticated,
  updateAvatarController.handle,
);

usersRoutes.get('/profile', ensureAuthenticated, profileUserController.handle);

export { usersRoutes };
