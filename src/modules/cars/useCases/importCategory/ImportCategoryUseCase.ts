import csvParse from 'csv-parser';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject('ImportRepository')
    private categoryRepository: ICategoriesRepository,
  ) {}

  async loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolver, reject) => {
      const stream = fs.createReadStream(file.path);

      const parseFile = csvParse();

      stream.pipe(parseFile);

      const categories: IImportCategory[] = [];

      parseFile
        .on('data', async line => {
          const { name, description } = line;
          categories.push({ description, name });
        })
        .on('end', () => {
          resolver(categories);
        })
        .on('error', err => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(category => {
      const { name, description } = category;

      const existCategory = this.categoryRepository.findByName(name);

      if (!existCategory) {
        this.categoryRepository.create({
          name,
          description,
        });
      }
    });
  }
}

export { ImportCategoryUseCase };
