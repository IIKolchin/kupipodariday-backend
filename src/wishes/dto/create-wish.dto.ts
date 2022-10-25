import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsDataURI,
  IsNumber,
  Min,
  IsUrl,
} from 'class-validator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';

export class CreateWishDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(250)
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  link: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  image: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  owner: CreateUserDto;
}
