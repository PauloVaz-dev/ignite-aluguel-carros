import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('list car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it('should be able to list all available  cars', async () => {
    await carsRepositoryInMemory.create({
      name: 'ww',
      description: 'qqq',
      daily_rate: 110.9,
      license_plate: 'qqq',
      fine_amount: 50,
      brand: 'audi',
      category_id: 'qqqqq',
    });
    const cars = await listCarsUseCase.execute({
      brand: 'audi',
    });

    expect(cars).toHaveLength(1);
  });

  it('should be able to list available  cars by name', async () => {
    await carsRepositoryInMemory.create({
      name: 'ww',
      description: 'qqq',
      daily_rate: 110.9,
      license_plate: 'ASR-2345',
      fine_amount: 50,
      brand: 'audi',
      category_id: 'qqqqq',
    });
    const cars = await listCarsUseCase.execute({
      name: 'ww',
    });
    expect(cars[0]).toHaveProperty('name', 'ww');
  });

  it('should be able to list available  cars by category', async () => {
    await carsRepositoryInMemory.create({
      name: 'ww',
      description: 'qqq',
      daily_rate: 110.9,
      license_plate: 'ASR-2345',
      fine_amount: 50,
      brand: 'audi',
      category_id: 'qqqqq',
    });
    const cars = await listCarsUseCase.execute({
      category_id: 'qqqqq',
    });
    expect(cars[0]).toHaveProperty('category_id', 'qqqqq');
  });
});
