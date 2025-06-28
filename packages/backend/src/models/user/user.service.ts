import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { ApiError } from 'exceptions/api.error';
import { Logger } from 'nestjs-pino';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly logger: Logger,
    private readonly userRepository: UserRepository,
  ) {}

  async getAll() {
    try {
      return await this.userRepository.findMany();
    } catch (e) {
      this.logger.error(`Error getAll users: ${e}`);
      throw ApiError.InternalServerError('Error getAll users', e);
    }
  }

  async getOne(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new HttpException(
        `User with id:${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }
}
