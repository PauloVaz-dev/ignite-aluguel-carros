import { Request, Response, Router } from 'express';

import { CreateSpecificationsController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';

const specificationsRoutes = Router();

const createSpecificationsController = new CreateSpecificationsController();

specificationsRoutes.post('/', createSpecificationsController.handle);

export { specificationsRoutes };
