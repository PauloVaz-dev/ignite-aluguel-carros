import dayjs from 'dayjs';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/erros/AppError';

import { RentalsRepositoryInMemory } from '../repositories/in-memory/RentalsRepositoryInMemory';
import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Rental', () => {
  const dayAdd1Day = dayjs().add(1, 'day').toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      carsRepositoryInMemory,
    );
  });

  it('should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'test',
      description: 'car test',
      daily_rate: 100,
      fine_amount: 40,
      brand: 'brand',
      category_id: '1111',
      license_plate: 'test',
    });

    const rental = await createRentalUseCase.execute({
      user_id: '12344',
      car_id: car.id,
      expected_return_date: dayAdd1Day,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if there is another open to the same user', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '12344',
        car_id: '1111',
        expected_return_date: dayAdd1Day,
      });

      const rental = await createRentalUseCase.execute({
        user_id: '12344',
        car_id: '1111',
        expected_return_date: dayAdd1Day,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if there is another open to the same car', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: 'test',
      expected_return_date: dayAdd1Day,
      user_id: '12345',
    });
    await expect(
      createRentalUseCase.execute({
        user_id: '234',
        car_id: 'test',
        expected_return_date: dayAdd1Day,
      }),
    ).rejects.toEqual(new AppError('Car is unavailable'));
  });

  it('should not be able to create a new rental invalid return time', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: 'd12d344',
        car_id: '1111',
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
