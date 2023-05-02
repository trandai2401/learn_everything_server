import { Injectable } from '@nestjs/common';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { generatePublicUrl } from 'src/service/videos';
import { InjectRepository } from '@nestjs/typeorm';
import { Lecture } from './entities/lecture.entity';
import { Repository } from 'typeorm';
import { Item } from '../item/entities/item.entity';

@Injectable()
export class LectureService {
  constructor(
    @InjectRepository(Lecture) private lectureRepository: Repository<Lecture>,
  ) {}
  async create(
    createLectureDto: CreateLectureDto,
    file: Express.Multer.File,
    item: Item,
  ) {
    const res = await generatePublicUrl(file);
    const lecture = new Lecture();
    lecture.item = item;
    lecture.video = res.webContentLink;
    return this.lectureRepository.save(lecture);
  }

  findAll() {
    return `This action returns all lecture`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lecture`;
  }

  update(id: number, updateLectureDto: UpdateLectureDto) {
    return `This action updates a #${id} lecture`;
  }

  remove(id: number) {
    return `This action removes a #${id} lecture`;
  }
}
