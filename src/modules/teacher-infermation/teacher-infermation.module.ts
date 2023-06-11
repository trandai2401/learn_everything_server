import { Module } from '@nestjs/common';
import { TeacherInfermationService } from './teacher-infermation.service';
import { TeacherInfermationController } from './teacher-infermation.controller';
import { TeacherInfermation } from './entities/teacher-infermation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TeacherInfermation])],
  controllers: [TeacherInfermationController],
  providers: [TeacherInfermationService],
})
export class TeacherInfermationModule {}
