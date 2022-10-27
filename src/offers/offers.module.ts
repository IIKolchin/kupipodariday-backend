import { Module } from '@nestjs/common';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { WishesModule } from 'src/wishes/wishes.module';
import { EmailSenderModule } from 'src/email-sender/email-sender.module';

@Module({
  imports: [TypeOrmModule.forFeature([Offer]), WishesModule, EmailSenderModule],
  controllers: [OffersController],
  providers: [OffersService],
})
export class OffersModule {}
