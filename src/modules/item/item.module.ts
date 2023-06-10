import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { LectureModule } from '../lecture/lecture.module';
import { QuestionModule } from '../question/question.module';
import { TestResult } from '../test-result/entities/test-result.entity';
import { ContestantSanswer } from '../contestant-sanswer/entities/contestant-sanswer.entity';
// imports: [TypeOrmModule.forFeature([TestResult])],

@Module({
  imports: [
    TypeOrmModule.forFeature([Item]),
    LectureModule,
    QuestionModule,
    TypeOrmModule.forFeature([TestResult]),
    TypeOrmModule.forFeature([ContestantSanswer]),
  ],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
