import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/auth/guards/role.enum';
import { Course } from './entities/course.entity';
import { SubCategory } from 'src/sub-category/entities/sub-category.entity';
import { Account } from 'src/account/entities/account.entity';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @Roles(Role.Teacher, Role.Admin)
  create(@Body() createCourseDto: CreateCourseDto & Course, @Request() req) {
    const account = new Account();
    account.id = req.user.sub;
    createCourseDto.created_by = account;
    const subCategory = new SubCategory();
    subCategory.id = createCourseDto.subCategoryId;
    createCourseDto.subCategory = subCategory;
    return this.courseService.create(createCourseDto);
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
