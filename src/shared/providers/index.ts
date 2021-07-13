import { container } from 'tsyringe';

import { IEmailEtherealProvider } from './MailProvider/IEmailEtherealProvider';
import { IEmailProvider } from './MailProvider/IEmailProvider';
import { EtherealMailProvider } from './MailProvider/Implementations/EtherealMailProvider';
import { MailCpanelProvider } from './MailProvider/Implementations/MailCpanelProvider';
import { LocalStorageProvider } from './StorageProvider/implementations/LocalStorageProvider';
import { S3StorageProvider } from './StorageProvider/implementations/S3StorageProvider';
import { IStorageProvider } from './StorageProvider/IStorageProvider';

container.registerSingleton<IEmailProvider>('Mailprovider', MailCpanelProvider);

container.registerInstance<IEmailEtherealProvider>(
  'EtherealMailProvider',
  new EtherealMailProvider(),
);

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  diskStorage[process.env.DISK],
);
