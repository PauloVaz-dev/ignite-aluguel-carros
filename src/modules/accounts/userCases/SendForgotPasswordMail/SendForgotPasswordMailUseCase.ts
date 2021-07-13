import moment from 'moment';
import { resolve } from 'path';
import { container, inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { AppError } from '@shared/erros/AppError';
import { IEmailEtherealProvider } from '@shared/providers/MailProvider/IEmailEtherealProvider';
import { IEmailProvider } from '@shared/providers/MailProvider/IEmailProvider';

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('EtherealMailProvider')
    private mailProvider: IEmailEtherealProvider,
  ) {}
  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'forgotPassword.hbs',
    );

    const token = uuidV4();
    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    };

    if (!user) {
      throw new AppError('User does not exists!');
    }

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date: moment().add(3, 'hours').toDate(),
    });

    await this.mailProvider.sendMail(email, 'ree', variables, templatePath);
  }
}

export { SendForgotPasswordMailUseCase };
