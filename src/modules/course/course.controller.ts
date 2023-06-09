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
  Query,
} from '@nestjs/common';
import axios from 'axios';

import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Course } from './entities/course.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Role } from '../auth/guards/role.enum';
import { Account } from '../account/entities/account.entity';

import { TranformationCourse } from 'src/pipes/course';
import { Public } from 'src/decorators/auth';
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
    return await this.courseService.create(createCourseDto, file);
  }

  @Get('search')
  @Public()
  async search(@Query() query) {
    console.log(query);
    const res = await this.courseService.search(query);
    return res;
  }

  @Get()
  @Public()
  async findAll(@Request() req) {
    return this.courseService.findAll(req?.user?.sub);
  }
  @Get('owner')
  @Roles(Role.Teacher, Role.Admin)
  courseOwner(@Request() req) {
    const id = req.user.sub;
    return this.courseService.findWhere({ created_by: { id: id } });
  }
  @Get('purchasedcourse/:id')
  getCourseToLearn(@Param('id') id: string, @Request() req) {
    return this.courseService.getCourseToLearn(req.user.sub, id);
  }

  @Get('data/:id')
  async getDataForEdit(@Param('id') id: string) {
    const course = await this.courseService.getDataForEdit(+id);
    course[0].sections = course[0].sections.sort((a, b) => a.id - b.id);
    return course[0];
  }

  @Get(':id')
  @Public()
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
