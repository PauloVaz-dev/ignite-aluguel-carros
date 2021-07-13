import { inject, injectable } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { AppError } from '@shared/erros/AppError';

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}
  async execute({
    name,
    brand,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    category_id,
  }: IRequest): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.finByLicencePlace(
      license_plate,
    );

    if (carAlreadyExists) {
      throw new AppError('Car already exists!');
    }
    const car = await this.carsRepository.create({
      name,
      brand,
      description,
      license_plate,
      daily_rate,
      fine_amount,
      category_id,
    });

    return car;
  }
}

export { CreateCarUseCase };
