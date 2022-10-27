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
  NotFoundException,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { RequestWithUser } from '../types/index';
import { JwtGuard } from 'src/guards/jwt.guard';
import { WishesService } from 'src/wishes/wishes.service';

@Controller('wishlistlists')
export class WishlistsController {
  constructor(
    private readonly wishlistsService: WishlistsService,
    private readonly wishesService: WishesService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(
    @Req() req: RequestWithUser,
    @Body() createWishlistDto: CreateWishlistDto,
  ) {
    const wishes = await this.wishesService.findWishes(
      createWishlistDto.itemsId,
    );
    const wishList = await this.wishlistsService.create(
      createWishlistDto,
      req.user,
      wishes,
    );
    console.log(createWishlistDto.itemsId);
    console.log(`wishList ${wishList}`);
    return wishList;
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.wishlistsService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const wishlist = await this.wishlistsService.findOne(+id);
    if (!wishlist[0]) {
      throw new NotFoundException('Список подарков не найден');
    }
    return wishlist[0];
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWishlistDto: UpdateWishlistDto,
    @Req() req: RequestWithUser,
  ) {
    return this.wishlistsService.update(+id, updateWishlistDto, req.user);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wishlistsService.remove(+id);
  }
}
