import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { Account } from './modules/account/entities/account.entity';
import { Role } from './modules/role/entities/role.entity';
import { Category } from './modules/category/entities/category.entity';
import { SubCategory } from './modules/sub-category/entities/sub-category.entity';
import { Course } from './modules/course/entities/course.entity';
import { AccountModule } from './modules/account/account.module';
import { RoleModule } from './modules/role/role.module';
import { AuthModule } from './modules/auth/auth.module';
import { CaslModule } from './modules/casl/casl.module';
import { CourseModule } from './modules/course/course.module';
import { CategoryModule } from './modules/category/category.module';
import { SubCategoryModule } from './modules/sub-category/sub-category.module';
import { LectureModule } from './modules/lecture/lecture.module';
import { ImageModule } from './modules/image/image.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345',
      database: 'learneverything',
      entities: [Account, Role, Category, SubCategory, Course],
      synchronize: true,
    }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport:
          'smtps://trandai2401@gmail.com:lgdlndlwbhvgntzy@smtp.gmail.com',
        defaults: {
          from: '"No Reply" <modules@nestjs.com>',
        },
        template: {
          dir: __dirname + '/src/templates/email',
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    AccountModule,
    RoleModule,
    AuthModule,
    CaslModule,
    CourseModule,
    CategoryModule,
    SubCategoryModule,
    LectureModule,
    ImageModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
