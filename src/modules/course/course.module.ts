import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { AccountModule } from '../account/account.module';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [TypeOrmModule.forFeature([Course]), AccountModule, ImageModule],

  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
