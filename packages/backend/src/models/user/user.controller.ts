import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { ApiError } from 'exceptions/api.error';
import { UserDto } from './dto/user.dto';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiBody({ type: UserDto })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() _dto: UserDto) {}

  @ApiOperation({ summary: 'Получение пользователя по токену' })
  @Get('/byToken')
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer токен',
    required: true,
  })
  getByToken(@Headers('Authorization') authHeader: string) {
    const token = authHeader.split(' ')[1];
    if (!token) {
      throw ApiError.UnauthorizedError();
    }
    // return this.userService.getByToken(token);
  }

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @ApiOperation({ summary: 'Получение пользователя по id' })
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.getOne(id);
  }

  @ApiOperation({ summary: 'Поиск пользователя по никнейму' })
  @Get('/search/:username')
  search(@Param() _username: string) {
    // return this.userService.search(username);
  }
}
