import { Injectable } from '@nestjs/common';
import { ApiError } from 'exceptions/api.error';
import { Logger } from 'nestjs-pino';
import { UserRepository } from './user.repository';

@Injectable()
export class UserPublicService {
  constructor(
    private readonly logger: Logger,
    private readonly userRepository: UserRepository,
  ) {}

  async getByToken(_token: string) {}

  async getByEmail(email: string) {
    this.logger.log('UserService getByEmail', {
      service: 'UserService',
      method: 'getByEmail',
      email: email,
    });
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      this.logger.error(
        'UserService getByEmail User with this email not found',
        {
          email: email,
        },
      );
      throw ApiError.BadRequest(
        'Пользователь с таким email не найден',
        'USER_NOT_FOUND',
      );
    }
    return user;
  }
}
