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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from '../guards/jwt.guard';
import { AuthService } from '../auth/auth.service';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  me(@Req() req: Request) {
    const user = req.user;
    console.log(user);

    return user;
  }

  // @UseGuards(JwtGuard)
  // @Post()
  // create(@Body() user: CreateUserDto) {
  //   return this.usersService.create(user);
  // }

  // @UseGuards(JwtGuard)
  // @Get('me')
  // me(@Req() request: Request, @Res({ passthrough: true }) response: Response) {

  //     return this.usersService.me();
  //   }

  //   try {
  //     const token = this.authService.auth();

  //     // устанавливаем куку в ответ на запрос
  //     response.cookie('authCookie', token);
  //   } catch (_) {
  //     throw new ForbiddenException();
  //   }
  // }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
