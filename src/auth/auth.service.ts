import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  auth(user: User) {
    const payload = { sub: user.id };
    const secret = this.configService.get('JWT_KEY');
    return { access_token: this.jwtService.sign(payload, { secret }) };
  }

  async validatePassword(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (user && isPasswordMatching) {
      return user;
    }
    return null;
  }
}
