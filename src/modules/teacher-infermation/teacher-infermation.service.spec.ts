import { Test, TestingModule } from '@nestjs/testing';
import { TeacherInfermationService } from './teacher-infermation.service';

describe('TeacherInfermationService', () => {
  let service: TeacherInfermationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeacherInfermationService],
    }).compile();

    service = module.get<TeacherInfermationService>(TeacherInfermationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
