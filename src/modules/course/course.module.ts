import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { AccountModule } from '../account/account.module';
import { ImageModule } from '../image/image.module';
import { Cart } from '../cart/entities/cart.entity';
import { CourseGateway } from './course.gateway';
import { CommentModule } from '../comment/comment.module';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course]),
    AccountModule,
    ImageModule,
    TypeOrmModule.forFeature([Cart]),
    CommentModule,
    CartModule,
  ],

  controllers: [CourseController],
  providers: [CourseService, CourseGateway],
})
export class CourseModule {}
