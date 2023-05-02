import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { ItemType } from '../item-type/entities/item-type.entity';

@Injectable()
export class ItemService {
  // constructor(
  //   @InjectRepository(Course)
  //   private courseRepository: Repository<Course>,
  //   private readonly imageService: ImageService,
  // ) {}

  constructor(
    @InjectRepository(Item) private itemRepository: Repository<Item>,
  ) {}

  create(createItemDto: CreateItemDto & Item) {
    const itemType = new ItemType();
    itemType.id = createItemDto.itemTypeId;
    createItemDto.typeItem = itemType;
    console.log(createItemDto);

    return this.itemRepository.save(createItemDto);
  }

  findAll() {
    return `This action returns all item`;
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
