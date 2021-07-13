import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/userCase/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/userCase/devolutionRental/DevolutionRentalController';
import { ListRentalsByUserController } from '@modules/rentals/userCase/listRentalsByUser/listRentalsByUserController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post('/', ensureAuthenticated, createRentalController.handle);
rentalRoutes.post(
  '/devolution/:id',
  ensureAuthenticated,
  devolutionRentalController.handle,
);

rentalRoutes.get(
  '/user',
  ensureAuthenticated,
  listRentalsByUserController.handle,
);

export { rentalRoutes };
