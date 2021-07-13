import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import { authenticateRoutes } from './authenticate.routes';
import { carsRoutes } from './cars.routes';
import { categoriesRoutes } from './categories.routes';
import { passwordRoutes } from './password.routes';
import { rentalRoutes } from './rental.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';

const router = Router();
router.use('/users', usersRoutes);
router.use('/categories', categoriesRoutes);
router.use('/cars', carsRoutes);
router.use('/specifications', ensureAuthenticated, specificationsRoutes);
router.use(authenticateRoutes);
router.use('/rentals', rentalRoutes);
router.use('/password', passwordRoutes);

export default router;
