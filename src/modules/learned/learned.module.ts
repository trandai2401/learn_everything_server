import { Module } from '@nestjs/common';
import { LearnedService } from './learned.service';
import { LearnedController } from './learned.controller';
import { Learned } from './entities/learned.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Learned])],

  controllers: [LearnedController],
  providers: [LearnedService],
})
export class LearnedModule {}
