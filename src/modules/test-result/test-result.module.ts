import { Module } from '@nestjs/common';
import { TestResultService } from './test-result.service';
import { TestResultController } from './test-result.controller';
import { TestResult } from './entities/test-result.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TestResult])],

  controllers: [TestResultController],
  providers: [TestResultService],
})
export class TestResultModule {}
