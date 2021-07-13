import moment from 'moment';
import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { AppError } from '@shared/erros/AppError';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository') private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository') private carsRepository: ICarsRepository,
  ) {}

  async execute({ user_id, id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);

    if (!rental) {
      throw new AppError('Rental does not exists!');
    }

    const duration = moment.duration(
      moment(rental.start_date).diff(moment().format('YYYY-MM-DD HH')),
    );
    const hours = duration.asHours();

    let daily;
    if (hours < 24) {
      daily = 1;
    }

    rental.end_date = new Date();

    rental.total = daily * car.daily_rate;

    this.rentalsRepository.create(rental);

    return rental;
  }
}

export { DevolutionRentalUseCase };
