import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import imageImgBBService from 'src/service/Image/imbb';
import ImageImgBBDT from 'src/service/Image/ImageDTO';
import { Image } from '../image/entities/image.entity';
import { ImageService } from '../image/image.service';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    private readonly imageService: ImageService,
  ) {}

  async create(
    createCourseDto: CreateCourseDto & Course,
    file: Express.Multer.File,
  ): Promise<Course | any> {
    let image: Promise<ImageImgBBDT>;

    if (file) {
      image = imageImgBBService.save(file);
    }
    console.log(12345);
    const course = this.courseRepository.save(createCourseDto);
    const [courseSaved, imageSaved] = await Promise.all([course, image]);

    if (imageSaved.id) {
      let imageNew = new Image();
      imageNew.idCloud = imageSaved.id;
      imageNew.name = imageSaved.title;
      imageNew.url = imageSaved.url;
      imageNew.thumbUrl = imageSaved.thumb.url;
      imageNew.mediumUrl = imageSaved.medium?.url
        ? imageSaved.medium?.url
        : imageSaved.thumb.url;
      imageNew.deleteUrl = imageSaved.delete_url;
      imageNew = await this.imageService.create(imageNew);
      courseSaved.image = imageNew;
      await this.courseRepository.save(courseSaved);
    }
    return courseSaved;
  }

  findAll() {
    return this.courseRepository.find({
      relations: {
        sections: {
          items: true,
        },
        image: true,
        created_by: {
          avatar: true,
        },
        subCategories: true,
      },
      select: {
        created_by: {
          fullName: true,
        },
      },
    });
  }

  findOne(id: number) {
    const courses = this.courseRepository.find({
      where: { id: id },
      relations: {
        lecturers: true,
        created_by: true,
        image: true,
        subCategories: true,
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
