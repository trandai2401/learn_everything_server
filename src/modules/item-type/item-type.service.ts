import { Injectable } from '@nestjs/common';
import { CreateItemTypeDto } from './dto/create-item-type.dto';
import { UpdateItemTypeDto } from './dto/update-item-type.dto';

@Injectable()
export class ItemTypeService {
  create(createItemTypeDto: CreateItemTypeDto) {
    return 'This action adds a new itemType';
  }

  findAll() {
    return `This action returns all itemType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} itemType`;
  }

  update(id: number, updateItemTypeDto: UpdateItemTypeDto) {
    return `This action updates a #${id} itemType`;
  }

  remove(id: number) {
    return `This action removes a #${id} itemType`;
  }
}
