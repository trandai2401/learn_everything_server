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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345',
      database: 'learneverything',
      entities: [Account, Role],
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
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
