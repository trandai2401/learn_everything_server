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
    const lecturers = createCourseDto.lecturers.map((lecturer) => {
      const lec = new Account();
      lec.id = +lecturer;
      return lec;
    });

    const subCategories = createCourseDto.subCategoryId.map((sub) => {
      const lec: SubCategory = new SubCategory();
      lec.id = +sub;
      return lec;
    });
    const subCategory = new SubCategory();
    subCategory.id = +createCourseDto.subCategoryId;

    const [lecturersF, subCategoriesF] = await Promise.all([
      lecturers,
      subCategories,
    ]);

    // console.log(lecturersF, subCategoriesF);

    createCourseDto.lecturers = lecturersF;

    createCourseDto.subCategories = subCategoriesF;

    return createCourseDto;
  }
}
