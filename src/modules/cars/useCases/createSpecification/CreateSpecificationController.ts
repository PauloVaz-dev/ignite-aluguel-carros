import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSpecificationsUseCase } from './CreateSpecificationUseCase';

class CreateSpecificationsController {
  handle(request: Request, response: Response): Response {
    const { name, description } = request.body;

    console.log(request.user);

    const createSpecificationsUseCase = container.resolve(
      CreateSpecificationsUseCase,
    );
    const specification = createSpecificationsUseCase.execute({
      name,
      description,
    });

    return response.status(201).json({
      specification,
    });
  }
}

export { CreateSpecificationsController };
