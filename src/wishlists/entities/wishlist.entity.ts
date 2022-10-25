import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
  ManyToOne,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import {
  MinLength,
  MaxLength,
  IsInt,
  IsString,
  IsDate,
  IsNotEmpty,
  IsDataURI,
  IsUrl,
} from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';

@Entity()
export class Wishlist {
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
    type: 'varchar',
    default: '',
  })
  @IsString()
  @MinLength(1, {
    message: 'Должно быть не менее 1 символа',
  })
  @MaxLength(1024, {
    message: 'Должно быть не более 1500 символов',
  })
  description: string;

  @Column()
  @IsUrl()
  image: string;

  @ManyToMany(() => Wish, (wish) => wish.wishlists)
  @JoinTable()
  items: Wish[];

  @ManyToOne(() => User, (user) => user.wishlists)
  owner: User;
}
