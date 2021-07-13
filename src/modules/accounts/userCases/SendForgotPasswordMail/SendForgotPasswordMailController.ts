import { Response, Request } from 'express';
import { container } from 'tsyringe';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

class SendForgotPasswordMailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const sendForgotPasswordMailController = container.resolve(
      SendForgotPasswordMailUseCase,
    );

    await sendForgotPasswordMailController.execute(email);
    return response.send();
  }
}

export { SendForgotPasswordMailController };
