import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
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
