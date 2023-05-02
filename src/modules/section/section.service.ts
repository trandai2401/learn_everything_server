import { Injectable } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Section } from './entities/section.entity';
import { Repository } from 'typeorm';
import { Course } from '../course/entities/course.entity';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(Section) private sectionRepository: Repository<Section>,
  ) {}

  create(createSectionDto: CreateSectionDto & Section) {
    const course = new Course();
    course.id = +createSectionDto.courseId;
    createSectionDto.course = course;
    return this.sectionRepository.save(createSectionDto);
  }

  findAll() {
    return `This action returns all section`;
  }

  findOne(id: number) {
    return `This action returns a #${id} section`;
  }

  update(id: number, updateSectionDto: UpdateSectionDto) {
    return `This action updates a #${id} section`;
  }

  remove(id: number) {
    return `This action removes a #${id} section`;
  }
}
