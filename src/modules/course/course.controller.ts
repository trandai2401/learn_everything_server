import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import axios from 'axios';

import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Course } from './entities/course.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { AccountService } from '../account/account.service';
import { Role } from '../auth/guards/role.enum';
import { Account } from '../account/entities/account.entity';
import { SubCategory } from '../sub-category/entities/sub-category.entity';
import imageImgBB from 'src/service/Image/imbb';
import { Readable } from 'stream';
import { TranformationCourse } from 'src/pipes/course';
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @Roles(Role.Teacher, Role.Admin)
  // @UsePipes(new TranformationCourse())
  async create(
    @Body(new TranformationCourse()) createCourseDto: CreateCourseDto & Course,
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const account = new Account();

    account.id = req.user.sub;
    createCourseDto.created_by = account;
    // return createCourseDto;
    return this.courseService.create(createCourseDto, file);
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
