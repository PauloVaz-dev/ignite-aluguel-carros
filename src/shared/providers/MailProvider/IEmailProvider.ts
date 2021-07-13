interface IAddress {
  email: string;
  name: string;
}
interface IMessage {
  to: IAddress;
  from: IAddress;
  subject: string;
  html?: string;
  template?: string;
  replacements?: {
    [key: string]: string;
  };
}
interface IEmailProvider {
  sendMail(message: IMessage): Promise<void>;
}

export { IEmailProvider, IMessage };
