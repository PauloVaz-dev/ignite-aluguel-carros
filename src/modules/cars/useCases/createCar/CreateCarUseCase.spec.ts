import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/erros/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('create car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'car',
      brand: 'brand',
      description: 'car',
      license_plate: 'asd-1234',
      fine_amount: 60,
      daily_rate: 100,
      category_id: 'category',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a new car with exist license plate', async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'car',
        brand: 'brand',
        description: 'car',
        license_plate: 'asd-1234',
        fine_amount: 60,
        daily_rate: 100,
        category_id: 'category',
      });

      await createCarUseCase.execute({
        name: 'car2',
        brand: 'brand',
        description: 'car',
        license_plate: 'asd-1234',
        fine_amount: 60,
        daily_rate: 100,
        category_id: 'category',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a new car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'car available',
      brand: 'brand',
      description: 'car',
      license_plate: 'asd-1234',
      fine_amount: 60,
      daily_rate: 100,
      category_id: 'category',
    });

    expect(car.available).toBe(true);
  });
});
