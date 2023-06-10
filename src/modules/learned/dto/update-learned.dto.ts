import { PartialType } from '@nestjs/mapped-types';
import { CreateLearnedDto } from './create-learned.dto';

export class UpdateLearnedDto extends PartialType(CreateLearnedDto) {}
