import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/erros/AppError';

interface IRequest {
  name: string;
  email: string;
  password: string;
  driver_license: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  async execute({
    name,
    email,
    password,
    driver_license,
  }: IRequest): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('User already exists');
    }

    const passwordHasd = await hash(password, 8);
    await this.usersRepository.create({
      name,
      email,
      password: passwordHasd,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
