import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { RequestWithUser } from 'src/types';
import { WishesService } from 'src/wishes/wishes.service';
import { JwtGuard } from 'src/guards/jwt.guard';
import { EmailSenderService } from '../email-sender/email-sender.service';

@Controller('offers')
export class OffersController {
  constructor(
    private readonly offersService: OffersService,
    private readonly wishesService: WishesService,
    private readonly emailSenderService: EmailSenderService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(
    @Body() createOfferDto: CreateOfferDto,
    @Req() req: RequestWithUser,
  ) {
    const wish = await this.wishesService.findOne(createOfferDto.itemId);
    const sum = wish.raised + createOfferDto.amount;
    if (wish.owner.id === req.user.id) {
      throw new BadRequestException(
        'Нельзя вносить деньги на собственные подарки',
      );
    }

    if (sum > wish.price) {
      throw new BadRequestException('Сумма превышает стоимость подарка');
    }

    if (wish.raised === wish.price) {
      throw new BadRequestException('Необходимая сумма уже собрана');
    }
    if (sum === wish.price) {
      const usersEmail = wish.offers.map((user) => user.user.email);
      const emails = [...usersEmail, req.user.email].join(', ');
      const message = `<img src=${wish.image} alt='Подарок' style='width:100%; object-fit:cover;'>
                      <p>Добрый день! Собрана необходимая сумма на подарок: ${wish.name}</p>
                      <p>Список почт всех, кто скилулся: ${emails}</p>`;
      await this.emailSenderService.sendEmail(emails, message);
    }

    const offer = await this.offersService.create(
      createOfferDto,
      req.user,
      wish,
    );
    await this.wishesService.addRaise(createOfferDto.itemId, sum);
    return offer;
  }

  @UseGuards(JwtGuard)
  @Get()
  async findAll() {
    const offers = await this.offersService.findAll();
    if (!offers) {
      throw new NotFoundException('Заявки не найдены');
    }
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const offer = await this.offersService.findOne(+id);
    if (!offer) {
      throw new NotFoundException('Заявка не найдена');
    }
  }
}
