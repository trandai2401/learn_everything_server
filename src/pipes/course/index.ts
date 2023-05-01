import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { Account } from 'src/modules/account/entities/account.entity';
import { CreateCourseDto } from 'src/modules/course/dto/create-course.dto';
import { Course } from 'src/modules/course/entities/course.entity';
import { SubCategory } from 'src/modules/sub-category/entities/sub-category.entity';

@Injectable()
export class TranformationCourse implements PipeTransform {
  async transform(
    createCourseDto: (CreateCourseDto & Course) & { fieldname: string },
    metadata: ArgumentMetadata,
  ): Promise<any> {
    const lecturers = await createCourseDto.lecturers.map(
      async (lecturer): Promise<Account | null> => {
        const lec: Account = new Account();
        lec.id = +lecturer;
        return lec;
      },
    );
    const lecturersF: Account[] = await Promise.all(lecturers);
    createCourseDto.lecturers = lecturersF ? lecturersF : [];

    const subCategory = new SubCategory();
    subCategory.id = createCourseDto.subCategoryId;

    createCourseDto.subCategory = subCategory;

    return createCourseDto;
  }
}
