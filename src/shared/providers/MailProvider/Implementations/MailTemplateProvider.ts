import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import path from 'path';

import { IEmailProvider, IMessage } from './IEmailProvider';

class MailTemplateProvider implements IEmailProvider {
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
    const filePath = path.join(__dirname, '../../teste.txt');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);

    const htmlToSend = template(message.replacements);

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
      html: htmlToSend,
    });
  }
}

export { MailTemplateProvider };
