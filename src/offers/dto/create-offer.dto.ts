import { IsBoolean, IsNotEmpty, IsNumber, MinLength } from 'class-validator';

export class CreateOfferDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsBoolean()
  hidden: boolean;

  @IsNumber()
  @IsNotEmpty()
  itemId: number;
}
