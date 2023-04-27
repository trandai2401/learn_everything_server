import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from './account/account.module';
import { Account } from './account/entities/account.entity';
import { RoleModule } from './role/role.module';
import { Role } from './role/entities/role.entity';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';
import { CourseModule } from './course/course.module';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { Category } from './category/entities/category.entity';
import { SubCategory } from './sub-category/entities/sub-category.entity';
import { Course } from './course/entities/course.entity';

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
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
