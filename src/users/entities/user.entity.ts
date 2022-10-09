import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import {
  MinLength,
  MaxLength,
  Length,
  IsInt,
  IsString,
  IsDate,
  IsNotEmpty,
  IsDataURI,
} from 'class-validator';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Offer } from 'src/offers/entities/offer.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;

  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @IsDate()
  updatedAt: Date;

  @Column({
    type: 'varchar',
    unique: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2, {
    message: 'Должно быть не менее 2 символов',
  })
  @MaxLength(30, {
    message: 'Должно быть не более 30 символов',
  })
  username: string;

  @Column({
    type: 'varchar',
    default: 'Пока ничего не рассказал о себе',
  })
  @IsString()
  @MinLength(2, {
    message: 'Должно быть не менее 2 символов',
  })
  @MaxLength(200, {
    message: 'Должно быть не более 200 символов',
  })
  about: string;

  @Column({
    type: 'path',
    default: 'https://i.pravatar.cc/300',
  })
  @IsDataURI()
  avatar: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  email: string;

  @Column()
  @IsString()
  password: string;

  @Column()
  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];

  @Column()
  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];

  @Column()
  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  wishlists: Wishlist[];
}
