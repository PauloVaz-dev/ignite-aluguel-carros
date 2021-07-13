import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListRentalsByUserUseCase } from './listRentalsByUserUseCase';

class ListRentalsByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    const listRentalsByUserUserCase = container.resolve(
      ListRentalsByUserUseCase,
    );

    const rentals = await listRentalsByUserUserCase.execute(user_id);

    return response.json(rentals);
  }
}

export { ListRentalsByUserController };
