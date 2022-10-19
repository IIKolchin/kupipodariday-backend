import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

interface TokenPayload {
  userId: number;
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  auth(user: User) {
    const payload = { sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  // getCookieWithJwtToken(user: User) {
  //   const payload = { sub: user.id };
  //   const token = this.jwtService.sign(payload);
  //   return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
  //     'JWT_EXPIRATION_TIME',
  //   )}`;
  // }

  async validatePassword(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);

    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (user && isPasswordMatching) {
      const { password, wishes, offers, wishlists, ...rest } = user;
      return rest;
    }
    return null;
  }

  // private async verifyPassword(
  //   plainTextPassword: string,
  //   hashedPassword: string,
  // ) {
  //   const isPasswordMatching = await bcrypt.compare(
  //     plainTextPassword,
  //     hashedPassword,
  //   );
  //   if (!isPasswordMatching) {
  //     throw new HttpException(
  //       'Wrong credentials provided',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  //   return isPasswordMatching;
  // }

  // async getAuthenticatedUser(username: string, plainTextPassword: string) {
  //   try {
  //     const user = await this.usersService.findByUsername(username);
  //     console.log(await this.verifyPassword(plainTextPassword, user.password));
  //     await this.verifyPassword(plainTextPassword, user.password);
  //     // user.password = undefined;
  //     return user;
  //   } catch (error) {
  //     throw new HttpException(
  //       'Wrong credentials providedqq',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }
}
