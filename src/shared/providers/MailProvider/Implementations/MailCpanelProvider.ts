import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { injectable } from 'tsyringe';

import { IEmailProvider, IMessage } from '../IEmailProvider';

@injectable()
class MailCpanelProvider implements IEmailProvider {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'mail.eprimesoft.com',
      port: 465,
      secure: true,
      auth: {
        user: 'paulo@eprimesoft.com',
        pass: 'melissa2010',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendMail(message: IMessage): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email,
      },
      from: {
        name: message.from.name,
        address: message.from.email,
      },
      subject: message.subject,
      html: message.html,
    });
  }
}

export { MailCpanelProvider };
