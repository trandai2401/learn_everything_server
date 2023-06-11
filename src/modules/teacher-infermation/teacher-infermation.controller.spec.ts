import { Test, TestingModule } from '@nestjs/testing';
import { TeacherInfermationController } from './teacher-infermation.controller';
import { TeacherInfermationService } from './teacher-infermation.service';

describe('TeacherInfermationController', () => {
  let controller: TeacherInfermationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeacherInfermationController],
      providers: [TeacherInfermationService],
    }).compile();

    controller = module.get<TeacherInfermationController>(TeacherInfermationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
