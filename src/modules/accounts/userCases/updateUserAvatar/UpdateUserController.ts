import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateAvatarUseCase } from './UpdateAvatarUseCase';

class UpdateAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const avatar_file = request.file.filename;
    const { id } = request.user;
    const updateAvatarUseCase = container.resolve(UpdateAvatarUseCase);

    await updateAvatarUseCase.execute({
      avatar_file,
      user_id: id,
    });

    return response.status(204).send();
  }
}

export { UpdateAvatarController };
