import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemPaymentService } from './item-payment.service';
import { CreateItemPaymentDto } from './dto/create-item-payment.dto';
import { UpdateItemPaymentDto } from './dto/update-item-payment.dto';

@Controller('item-payment')
export class ItemPaymentController {
  constructor(private readonly itemPaymentService: ItemPaymentService) {}

  @Post()
  create(@Body() createItemPaymentDto: CreateItemPaymentDto) {
    return this.itemPaymentService.create(createItemPaymentDto);
  }

  @Get()
  findAll() {
    return this.itemPaymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemPaymentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemPaymentDto: UpdateItemPaymentDto) {
    return this.itemPaymentService.update(+id, updateItemPaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemPaymentService.remove(+id);
  }
}
