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
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/auth/guards/role.enum';
import { Course } from './entities/course.entity';
import { SubCategory } from 'src/sub-category/entities/sub-category.entity';
import { Account } from 'src/account/entities/account.entity';
import { AccountService } from 'src/account/account.service';

@Controller('course')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly accountService: AccountService,
  ) {}

  @Post()
  @Roles(Role.Teacher, Role.Admin)
  async create(
    @Body() createCourseDto: CreateCourseDto & Course,
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file);
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
