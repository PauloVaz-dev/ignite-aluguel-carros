import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpeficificationsRepositoryInMemory';
import { AppError } from '@shared/erros/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let specificationRepositoryInMemory: SpecificationsRepositoryInMemory;
let carsRepositotyInMemory: CarsRepositoryInMemory;
describe('Create car specification', () => {
  beforeEach(() => {
    carsRepositotyInMemory = new CarsRepositoryInMemory();
    specificationRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositotyInMemory,
      specificationRepositoryInMemory,
    );
  });

  it('should be able to add a new specification to a new existent car', async () => {
    expect(async () => {
      const car_id = '122334';
      const specifications_id = ['6543211'];
      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf('');
  });

  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepositotyInMemory.create({
      name: 'car available',
      brand: 'brand',
      description: 'car',
      license_plate: 'asd-1234',
      fine_amount: 60,
      daily_rate: 100,
      category_id: 'category',
    });

    // console.log(car);

    const specification = await specificationRepositoryInMemory.create({
      description: 'teste',
      name: 'teste',
    });

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: [specification.id],
    });

    // console.log(specificationsCars);
  });
});
