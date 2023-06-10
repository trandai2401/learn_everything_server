import { PartialType } from '@nestjs/mapped-types';
import { CreateContestantSanswerDto } from './create-contestant-sanswer.dto';

export class UpdateContestantSanswerDto extends PartialType(CreateContestantSanswerDto) {}
