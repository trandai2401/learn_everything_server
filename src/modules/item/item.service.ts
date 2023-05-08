import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { ItemType } from '../item-type/entities/item-type.entity';
import { LectureService } from '../lecture/lecture.service';
import { Lecture } from '../lecture/entities/lecture.entity';
import { Section } from '../section/entities/section.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private itemRepository: Repository<Item>,
    private lectureService: LectureService,
  ) {}

  async create(createItemDto: CreateItemDto & Item, file: Express.Multer.File) {
    const itemType = new ItemType();
    itemType.id = createItemDto.itemTypeId;
    createItemDto.typeItem = itemType;
    const section = new Section();
    section.id = createItemDto.sectionId;
    createItemDto.section = section;
    console.log(createItemDto);
    const item = await this.itemRepository.save(createItemDto);
    const lecture = await this.lectureService.create(new Lecture(), file, item);
    // item.lecture = lecture;
    // return lecture;

    console.log(item);

    return this.itemRepository.save(item);
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
