import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserPublicService } from './user-public.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserPublicService, UserRepository],
  imports: [],
  exports: [UserPublicService],
})
export class UserModule {}
