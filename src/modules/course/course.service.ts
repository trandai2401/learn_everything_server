import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  create(createCourseDto: CreateCourseDto & Course) {
    return this.courseRepository.save(createCourseDto);
  }

  findAll() {
    return `This action returns all course`;
  }

  findOne(id: number) {
    const courses = this.courseRepository.find({
      where: { id: id },
      relations: {
        lecturers: true,
        created_by: true,
        subCategory: true,
      },
      select: {
        lecturers: {
          id: true,
          fullName: true,
        },
        created_by: {
          id: true,
          fullName: true,
        },
      },
    });
    return courses;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
