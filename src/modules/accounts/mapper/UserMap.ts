import { classToClass } from 'class-transformer';

import { IUserResponseDTO } from '../dtos/IUserReponseDTO';
import { User } from '../infra/typeorm/entities/User';

class UserMap {
  static toDTO({
    email,
    name,
    isAdmin,
    avatar,
    driver_license,
    avatar_url,
  }: User): IUserResponseDTO {
    const user = classToClass({
      email,
      name,
      isAdmin,
      avatar,
      driver_license,
      avatar_url,
    });
    return user;
  }
}

export { UserMap };
