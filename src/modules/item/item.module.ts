import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { LectureModule } from '../lecture/lecture.module';

@Module({
  imports: [TypeOrmModule.forFeature([Item]), LectureModule],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
