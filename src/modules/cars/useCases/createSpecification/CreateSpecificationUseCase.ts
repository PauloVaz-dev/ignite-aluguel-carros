import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/erros/AppError';

import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

interface IRequest {
  name: string;
  description: string;
}
@injectable()
class CreateSpecificationsUseCase {
  constructor(
    @inject('CategoriesRepository')
    private specificationRepository: ISpecificationsRepository,
  ) {}
  execute({ name, description }: IRequest): void {
    const specificationSameName = this.specificationRepository.findByName(name);
    if (specificationSameName) {
      throw new AppError('Epecification already exists!');
    }
    this.specificationRepository.create({
      name,
      description,
    });
  }
}

export { CreateSpecificationsUseCase };
