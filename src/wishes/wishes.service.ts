import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from 'src/offers/entities/offer.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository, Any } from 'typeorm';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishesRepository: Repository<Wish>,
  ) {}
  async create(createWishDto: CreateWishDto, user: User) {
    const wish = await this.wishesRepository.create({
      ...createWishDto,
      owner: user,
    });
    return await this.wishesRepository.save(wish);
  }

  async findLast() {
    const wishes = await this.wishesRepository.find({
      relations: ['owner'],
      order: {
        createdAt: 'DESC',
      },
      take: 40,
    });
    return wishes;
  }

  async findTop() {
    const wishes = await this.wishesRepository.find({
      relations: ['owner'],
      order: {
        copied: 'DESC',
      },
      take: 10,
    });
    return wishes;
  }

  async findWishes(wishes: number[]) {
    return await this.wishesRepository.find({
      where: { id: Any(wishes) },
    });
  }

  async findOne(id: number) {
    const wish = await this.wishesRepository.find({
      relations: {
        owner: true,
        offers: {
          user: {
            wishes: true,
            offers: true,
            wishlists: {
              owner: true,
              items: true,
            },
          },
        },
      },
      where: {
        id: id,
      },
    });
    return wish[0];
  }

  async findAll() {
    const wishes = await this.wishesRepository.find({
      relations: ['owner'],
    });
    return wishes;
  }

  async update(id: number, updateWishDto: UpdateWishDto, user: User) {
    const wish = await this.wishesRepository.update(id, {
      ...updateWishDto,
      owner: user,
    });
    return wish;
  }

  async remove(id: number) {
    return await this.wishesRepository.delete(id);
  }

  async copy(id: number, copied: number, user: User) {
    await this.wishesRepository.update(id, {
      copied: copied,
      owner: user,
    });
    const wish = await this.wishesRepository.find({
      relations: ['owner'],
      where: {
        id: id,
      },
    });
    return await this.wishesRepository.save(wish);
  }

  async addRaise(id: number, sum: number) {
    return await this.wishesRepository.update(id, {
      raised: sum,
      // offers: offer,
    });
  }
}
