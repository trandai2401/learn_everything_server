import { Module } from '@nestjs/common';
import { ContestantSanswerService } from './contestant-sanswer.service';
import { ContestantSanswerController } from './contestant-sanswer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContestantSanswer } from './entities/contestant-sanswer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContestantSanswer])],

  controllers: [ContestantSanswerController],
  providers: [ContestantSanswerService],
})
export class ContestantSanswerModule {}
