import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_KEY'),
    });
  }

  async validate(jwtPayload: { sub: number }) {
    console.log(jwtPayload);
    const user = await this.usersService.findOne(jwtPayload.sub);
    console.log(jwtPayload.sub);
    console.log(user);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
