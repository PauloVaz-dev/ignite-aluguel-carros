import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

class ListSpecificationUseCase {
  constructor(private specificationRepository: ISpecificationsRepository) {}
  async execute(): Promise<Specification[]> {
    const categories = this.specificationRepository.find();

    return categories;
  }
}

export { ListSpecificationUseCase };
