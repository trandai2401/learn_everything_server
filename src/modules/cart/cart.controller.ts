import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Req,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body('courseId') courseId: number, @Request() req) {
    return this.cartService.create(req.user.sub, courseId);
  }

  @Get()
  findOwner(@Request() req) {
    return this.cartService.findOne(+req.user.sub);
  }

  @Get('mycart')
  getMyCourse(@Request() req) {
    return this.cartService.getMyCourse(req.user.sub);
  }

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') courseId: string, @Request() req) {
    return this.cartService.remove(+req.user.sub, +courseId);
  }
}
