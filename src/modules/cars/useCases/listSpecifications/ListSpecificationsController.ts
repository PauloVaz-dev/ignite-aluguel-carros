import { Request, Response } from 'express';

import { ListSpecificationUseCase } from './ListSpecificationUseCase';

class ListSpecificationsController {
  constructor(private listSpecificationsUseCase: ListSpecificationUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const all = await this.listSpecificationsUseCase.execute();
    return response.status(201).json(all);
  }
}

export { ListSpecificationsController };
