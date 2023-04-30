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
@Controller('course')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly accountService: AccountService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @Roles(Role.Teacher, Role.Admin)
  async create(
    @Body() createCourseDto: CreateCourseDto & Course,
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // console.log(file);
    console.log(Readable.from(file.buffer));
    // return file.buffer.toString('base64');
    if (file) {
      // const res = await axios.post(
      //   'https://api.imgbb.com/1/upload',
      //   {
      //     key: 'e76b08665607a4e4c8a077cd5f12e775',
      //     image: file.buffer.toString('base64'),
      //   },
      //   {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      //   },
      // );
      // // const res = await imageImgBB.post('', {
      // //   key: 'e76b08665607a4e4c8a077cd5f12e775',
      // //   image: file.buffer.toString('base64'),
      // // });
      // console.log(res);

      return 'Có';
    } else return 'khum';
    // console.log(createCourseDto);
    return 0;
    // console.log(createCourseDto);

    const lecturers = await createCourseDto.lecturers.map(
      async (lecturer): Promise<Account | null> => {
        const lec: Account = await this.accountService.findOne(+lecturer);
        return lec;
      },
    );
    const lecturersF: Account[] = await Promise.all(lecturers);

    const account = new Account();
    account.id = req.user.sub;
    createCourseDto.created_by = account;
    const subCategory = new SubCategory();
    subCategory.id = createCourseDto.subCategoryId;

    createCourseDto.subCategory = subCategory;
    createCourseDto.lecturers = lecturersF ? lecturersF : [];
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
