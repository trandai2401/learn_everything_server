import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Between, In, Not, Repository } from 'typeorm';
import imageImgBBService from 'src/service/Image/imbb';
import ImageImgBBDT from 'src/service/Image/ImageDTO';
import { Image } from '../image/entities/image.entity';
import { ImageService } from '../image/image.service';
import { Cart } from '../cart/entities/cart.entity';
import { CartService } from '../cart/cart.service';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    private readonly imageService: ImageService,
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
    private readonly cartService: CartService,
  ) {}

  async create(
    createCourseDto: CreateCourseDto & Course,
    file: Express.Multer.File,
  ): Promise<Course | any> {
    let image: Promise<ImageImgBBDT>;

    if (file) {
      image = imageImgBBService.save(file);
    }
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

  async findAll(userId = undefined) {
    let courseIds = [];
    if (userId) {
      const cart = await this.cartService.getMyCourse(userId);
      courseIds = cart.map((cart) => {
        return cart.courseId;
      });
    }
    return this.courseRepository.find({
      where: {
        id: Not(In(courseIds)),
      },
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
        sections: {
          items: { typeItem: true, lecture: true },
        },
        created_by: true,
        image: true,
        subCategories: true,
      },
      select: {
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

  findWhere(where) {
    return this.courseRepository.find({
      where: { ...where },
      relations: {
        sections: {
          items: true,
        },
        image: true,
        created_by: {
          avatar: true,
        },
        subCategories: true,
        comments: true,
        carts: true,
      },
      select: {
        created_by: {
          fullName: true,
        },
      },
    });
  }

  getDataForEdit(id: number) {
    const courses = this.courseRepository.find({
      where: { id: id },
      relations: {
        lecturers: true,
        created_by: true,
        image: true,
        subCategories: true,
        sections: {
          items: { typeItem: true, lecture: true },
        },
      },
      select: {
        lecturers: {
          id: true,
          fullName: true,
        },
      },
      order: {
        id: 'ASC',
        sections: { items: { id: 'ASC' } },
      },
    });
    return courses;
  }

  getCourseToLearn = async (userId, courseId) => {
    const carts = await this.cartRepository.find({
      where: { accountId: userId, courseId: courseId },
      relations: {
        course: {
          lecturers: true,
          created_by: true,
          image: true,
          subCategories: true,
          sections: {
            items: { typeItem: true, lecture: true },
          },
        },
      },
      order: {
        course: { sections: { items: { id: 'ASC' } } },
      },
    });
    let cart = null;
    if (carts.length != 0) {
      cart = carts[0];
    }
    return cart;
  };

  search = async (query) => {
    const { keyword = '', order_by, price, category } = query;
    const queryString = `
    SELECT * FROM course
    WHERE bodau(course.title) like bodau("%${keyword}%") or bodau(course.description) like bodau("%${keyword}%") 
  `;
    const entities = await this.courseRepository.query(queryString);
    const courseId = entities.map((course) => {
      return course.id;
    });
    const wheres: { id?: any; subCategories?: any; price?: any } = {
      id: In(courseId),
    };

    if (category)
      wheres.subCategories = {
        id: In(category),
      };

    if (price) {
      wheres.price = price;
    }

    const courses = await this.courseRepository.find({
      where: wheres,
      relations: {
        lecturers: true,
        created_by: true,
        image: true,
        subCategories: true,
        sections: {
          items: { typeItem: true, lecture: true },
        },
      },
    });
    return courses;
    const res = await this.courseRepository.find();
    return res;
  };
}
