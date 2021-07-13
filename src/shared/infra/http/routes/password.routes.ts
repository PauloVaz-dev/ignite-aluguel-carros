import { Router } from 'express';

import { ResetPasswordUserController } from '@modules/accounts/userCases/resetPasswordUser/ResetPasswordUserController';
import { SendForgotPasswordMailController } from '@modules/accounts/userCases/SendForgotPasswordMail/SendForgotPasswordMailController';

const passwordRoutes = Router();

const sendMailForgotPasswordController = new SendForgotPasswordMailController();

const resetPasswordController = new ResetPasswordUserController();

passwordRoutes.post('/forgot', sendMailForgotPasswordController.handle);

passwordRoutes.post('/reset', resetPasswordController.handle);

export { passwordRoutes };
