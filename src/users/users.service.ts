import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

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

  // async findAll(): Promise<User[]> {
  //   return this.usersRepository.find();
  // }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async update(id: number, user: UpdateUserDto) {
    return this.usersRepository.update({ id }, user);
  }

  async findByUsername(username: string) {
    const user = await this.usersRepository.findOneBy({ username });

    return user;
  }

  // async findByEmail(email: string) {
  //   const user = await this.usersRepository.findOneBy({ email });

  //   return user;
  // }
}
