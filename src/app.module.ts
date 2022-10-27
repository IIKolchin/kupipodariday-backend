import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WishesModule } from './wishes/wishes.module';
import { UsersModule } from './users/users.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { OffersModule } from './offers/offers.module';
import { User } from './users/entities/user.entity';
import { Wish } from './wishes/entities/wish.entity';
import { Wishlist } from './wishlists/entities/wishlist.entity';
import { Offer } from './offers/entities/offer.entity';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { EmailSenderService } from './email-sender/email-sender.service';
import { EmailSenderModule } from './email-sender/email-sender.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [User, Wish, Wishlist, Offer],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    // MailerModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => ({
    //     transport: {
    //       host: configService.get('EMAIL_SENDER_HOST'),
    //       port: configService.get('EMAIL_SENDER_PORT'),
    //       ignoreTLS: true,
    //       secure: false,
    //       auth: {
    //         user: configService.get('EMAIL_SENDER_USER'),
    //         pass: configService.get('EMAIL_SENDER_PASS'),
    //       },
    //     },
    //     defaults: {
    //       from: '"No Reply" <no-reply@localhost>',
    //     },
    //     preview: true,
    //     template: {
    //       dir: process.cwd() + '/template/',
    //       adapter: new HandlebarsAdapter(),
    //       options: {
    //         strict: true,
    //       },
    //     },
    //   }),
    //   inject: [ConfigService],
    // }),
    ConfigModule.forRoot(),
    WishesModule,
    UsersModule,
    WishlistsModule,
    OffersModule,
    AuthModule,
    EmailSenderModule,
  ],
})
export class AppModule {}
