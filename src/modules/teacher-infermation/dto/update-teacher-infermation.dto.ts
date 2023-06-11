import { PartialType } from '@nestjs/mapped-types';
import { CreateTeacherInfermationDto } from './create-teacher-infermation.dto';

export class UpdateTeacherInfermationDto extends PartialType(CreateTeacherInfermationDto) {}
