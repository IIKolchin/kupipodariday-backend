import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ForbiddenException,
  Req,
  Res,
  ClassSerializerInterceptor,
  UseInterceptors,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from '../guards/jwt.guard';
import { AuthService } from '../auth/auth.service';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { RequestWithUser } from 'src/types';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtGuard)
  @Get('me')
  me(@Req() req: Request) {
    const user = req.user;
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    return user;
  }

  @UseGuards(JwtGuard)
  @Get(':username')
  async getByUsername(@Param() params: { username: string }) {
    const user = await this.usersService.findUserByUsername(params.username);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    return user;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtGuard)
  @Get('me/wishes')
  async getMyWishes(@Req() req: RequestWithUser) {
    const { id } = req.user;
    return await this.usersService.findWishes(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtGuard)
  @Get('me/:username')
  async getByUserName(@Param() params: { username: string }) {
    const user = await this.usersService.findByUsername(params.username);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    return user;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtGuard)
  @Patch('me')
  async update(
    @Req() req: RequestWithUser,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (!req.user) {
      throw new NotFoundException('Редактировать можно только свои данные');
    }

    const { id } = req.user;
    const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
    const user = await this.usersService.update(id, {
      ...updateUserDto,
      password: hashedPassword,
    });

    return user;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtGuard)
  @Post('find')
  async findMany(@Body() body: { query: string }) {
    return await this.usersService.findMany(body.query);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtGuard)
  @Get(':username/wishes')
  async getUsersWishes(@Param() params: { username: string }) {
    const user = await this.usersService.findUserByUsername(params.username);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    return await this.usersService.findWishes(user.id);
  }
}
