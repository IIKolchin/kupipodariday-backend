import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsDataURI,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateWishDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(250)
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsDataURI()
  link: string;

  @IsString()
  @IsNotEmpty()
  @IsDataURI()
  image: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;
}
