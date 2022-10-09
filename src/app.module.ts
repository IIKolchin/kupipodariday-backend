import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DATABASE,
  HOST,
  PASSWORD,
  PORT,
  TYPE,
  USERNAME,
} from './config/config';
import { WishesModule } from './wishes/wishes.module';
import { UsersModule } from './users/users.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { OffersModule } from './offers/offers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: TYPE,
      host: HOST,
      port: PORT,
      username: USERNAME,
      password: PASSWORD,
      database: DATABASE,
      entities: [],
      synchronize: true,
    }),
    WishesModule,
    UsersModule,
    WishlistsModule,
    OffersModule,
  ],
})
export class AppModule {}
