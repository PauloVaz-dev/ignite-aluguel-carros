import moment from 'moment';
import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { AppError } from '@shared/erros/AppError';

import { Rental } from '../infra/typeorm/entities/Rental';
import { IRentalsRepository } from '../repositories/IRentalsRepository';

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}
@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository') private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository') private carsRepository: ICarsRepository,
  ) {}
  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id,
    );

    if (carUnavailable) {
      throw new AppError('Car is unavailable');
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id,
    );

    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for user!");
    }

    const duration = moment.duration(
      moment(expected_return_date).diff(moment().format('YYYY-MM-DD HH')),
    );
    const hours = duration.asHours();

    if (hours < 24) {
      throw new AppError('Invalid return time!');
    }

    const rentals = await this.rentalsRepository.create({
      car_id,
      expected_return_date,
      user_id,
    });

    await this.carsRepository.updateAvailable(car_id, false);

    return rentals;
  }
}

export { CreateRentalUseCase };
