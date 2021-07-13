import { inject, injectable } from 'tsyringe';

import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { AppError } from '@shared/erros/AppError';

import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoryRepository: ICategoriesRepository,
  ) {}
  async execute({ name, description }: IRequest): Promise<Category> {
    const categoryAlreadyExists = await this.categoryRepository.findByName(
      name,
    );

    if (categoryAlreadyExists) {
      throw new AppError('Category Already exisssssssssst!');
    }

    const category = this.categoryRepository.create({
      name,
      description,
    });

    return category;
  }
}

export { CreateCategoryUseCase };
