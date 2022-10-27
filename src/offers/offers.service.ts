import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Wish } from '../wishes/entities/wish.entity';
import { Offer } from './entities/offer.entity';
import { CreateOfferDto } from './dto/create-offer.dto';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
  ) {}

  async create(createOfferDto: CreateOfferDto, user: User, item: Wish) {
    const offer = await this.offerRepository.create({
      ...createOfferDto,
      user: user,
      item: item,
    });
    return await this.offerRepository.save(offer);
  }

  async findAll(): Promise<Offer[]> {
    return this.offerRepository.find({
      relations: {
        item: {
          owner: true,
          offers: true,
        },
        user: {
          wishes: true,
          wishlists: true,
          offers: true,
        },
      },
    });
  }

  async findAllForWishes(id: number): Promise<Offer[]> {
    return this.offerRepository.find({
      relations: {
        item: {
          owner: true,
          offers: true,
        },
        user: {
          wishes: {
            owner: true,
            offers: true,
          },
          offers: true,
          wishlists: {
            owner: true,
            items: true,
          },
        },
      },
      where: {
        item: {
          id: id,
        },
      },
    });
  }

  async findOne(id: number): Promise<Offer> {
    return this.offerRepository.findOneBy({ id });
  }
}
