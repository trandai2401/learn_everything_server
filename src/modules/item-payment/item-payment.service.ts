import { Injectable } from '@nestjs/common';
import { CreateItemPaymentDto } from './dto/create-item-payment.dto';
import { UpdateItemPaymentDto } from './dto/update-item-payment.dto';

@Injectable()
export class ItemPaymentService {
  create(createItemPaymentDto: CreateItemPaymentDto) {
    return 'This action adds a new itemPayment';
  }

  findAll() {
    return `This action returns all itemPayment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} itemPayment`;
  }

  update(id: number, updateItemPaymentDto: UpdateItemPaymentDto) {
    return `This action updates a #${id} itemPayment`;
  }

  remove(id: number) {
    return `This action removes a #${id} itemPayment`;
  }
}
