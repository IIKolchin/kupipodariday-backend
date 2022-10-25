import {
  Controller,
  Post,
  UseGuards,
  Req,
  Res,
  Body,
  Get,
  HttpCode,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LocalGuard } from '../guards/local.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Request, Response } from 'express';
import { User } from '../users/entities/user.entity';
import { JwtGuard } from '../guards/jwt.guard';
import * as bcrypt from 'bcrypt';

interface RequestWithUser extends Request {
  user: User;
}

@Controller()
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(200)
  @UseGuards(LocalGuard)
  @Post('signin')
  async signin(@Req() req: RequestWithUser) {
    const { user } = req;
    return this.authService.auth(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return user;
  }
}
