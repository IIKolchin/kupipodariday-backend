import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersRepository.create(createUserDto);

    return this.usersRepository.save(user);
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        id: id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        about: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update({ id }, updateUserDto);
  }

  async findByUsername(username: string) {
    const user = await this.usersRepository.findOne({
      select: {
        username: true,
        password: true,
      },
      where: {
        username: username,
      },
    });
    return user;
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }

  async findMany(query: string) {
    const user = await this.usersRepository.find({
      where: [{ username: query }, { email: query }],
    });
    return user;
  }

  async findMyWishes(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    const wishes = await this.usersRepository.find({
      select: ['wishes'],
      relations: {
        wishes: {
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
      },
      where: {
        id: id,
      },
    });
    const wishesArr = wishes.map((item) => item.wishes);
    return wishesArr[0];
  }

  async findUsersWishes(username: string) {
    const wishes = await this.usersRepository.find({
      where: {
        username: username,
      },
      relations: {
        wishes: {
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
      },
    });
    console.log(`wishes ${wishes}`);
    return wishes;
  }
}
