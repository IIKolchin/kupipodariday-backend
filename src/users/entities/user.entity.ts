import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  Unique,
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
  IsEmail,
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
  //   @Unique('Dublicate name', ['name'])
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
    type: 'varchar',
    default: 'https://i.pravatar.cc/300',
  })
  @IsString()
  @IsDataURI()
  avatar: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  @IsString()
  @IsEmail()
  //   @Unique('Dublicate name', ['name'])
  email: string;

  @Column()
  @IsString()
  password: string;

  @Column('simple-array', { nullable: true })
  @OneToMany(() => Wish, (wish) => wish.id)
  @JoinColumn()
  wishes: Wish[];

  @Column('simple-array', { nullable: true })
  @OneToMany(() => Wish, (wish) => wish.id)
  offers: Wish[];

  @Column('simple-array', { nullable: true })
  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  wishlists: Wishlist[];
}
