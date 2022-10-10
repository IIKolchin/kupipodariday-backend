import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Offer } from './entities/offer.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
  ) {}

  async create(createOfferDto: CreateOfferDto) {
    return this.offerRepository.save(createOfferDto);
  }

  async findAll(): Promise<Offer[]> {
    return this.offerRepository.find();
  }

  async findOne(id: number): Promise<Offer> {
    return this.offerRepository.findOneBy({ id });
  }

  // async updateOne(id: number, updateOfferDto: UpdateOfferDto): Promise<Offer> {
  //   return this.offerRepository.update({ id }, updateOfferDto);
  // }

  // removeOne(id: number) {
  //   return `This action removes a #${id} offer`;
  // }
}
