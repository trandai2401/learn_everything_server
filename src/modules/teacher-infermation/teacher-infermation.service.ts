import { Injectable } from '@nestjs/common';
import { CreateTeacherInfermationDto } from './dto/create-teacher-infermation.dto';
import { UpdateTeacherInfermationDto } from './dto/update-teacher-infermation.dto';

@Injectable()
export class TeacherInfermationService {
  create(createTeacherInfermationDto: CreateTeacherInfermationDto) {
    return 'This action adds a new teacherInfermation';
  }

  findAll() {
    return `This action returns all teacherInfermation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teacherInfermation`;
  }

  update(id: number, updateTeacherInfermationDto: UpdateTeacherInfermationDto) {
    return `This action updates a #${id} teacherInfermation`;
  }

  remove(id: number) {
    return `This action removes a #${id} teacherInfermation`;
  }
}
