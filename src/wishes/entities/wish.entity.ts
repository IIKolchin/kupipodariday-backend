import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import {
  MinLength,
  MaxLength,
  IsInt,
  IsString,
  IsDate,
  IsNotEmpty,
  IsDataURI,
} from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Offer } from 'src/offers/entities/offer.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';

@Entity()
export class Wish {
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
  @IsString()
  @MinLength(1, {
    message: 'Должно быть не менее 1 символа',
  })
  @MaxLength(250, {
    message: 'Должно быть не более 250 символов',
  })
  name: string;

  @Column({
    type: 'path',
  })
  @IsDataURI()
  link: string;

  @Column({
    type: 'path',
  })
  @IsDataURI()
  image: string;

  @Column({
    type: 'money',
  })
  price: number;

  @Column({
    type: 'money',
  })
  raised: string;

  @ManyToOne(() => User, (user) => user.id)
  owner: User;

  @Column({
    type: 'varchar',
  })
  @IsString()
  @MinLength(1, {
    message: 'Должно быть не менее 1 символа',
  })
  @MaxLength(1024, {
    message: 'Должно быть не более 1024 символов',
  })
  description: string;

  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];

  @Column()
  copied: number;

  @OneToMany(() => Wishlist, (wishlist) => wishlist.items)
  wislists: Wishlist;
}
