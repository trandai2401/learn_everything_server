import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeacherInfermationService } from './teacher-infermation.service';
import { CreateTeacherInfermationDto } from './dto/create-teacher-infermation.dto';
import { UpdateTeacherInfermationDto } from './dto/update-teacher-infermation.dto';

@Controller('teacher-infermation')
export class TeacherInfermationController {
  constructor(private readonly teacherInfermationService: TeacherInfermationService) {}

  @Post()
  create(@Body() createTeacherInfermationDto: CreateTeacherInfermationDto) {
    return this.teacherInfermationService.create(createTeacherInfermationDto);
  }

  @Get()
  findAll() {
    return this.teacherInfermationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherInfermationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeacherInfermationDto: UpdateTeacherInfermationDto) {
    return this.teacherInfermationService.update(+id, updateTeacherInfermationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherInfermationService.remove(+id);
  }
}
