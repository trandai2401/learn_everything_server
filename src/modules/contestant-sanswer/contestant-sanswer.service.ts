import { Injectable } from '@nestjs/common';
import { CreateContestantSanswerDto } from './dto/create-contestant-sanswer.dto';
import { UpdateContestantSanswerDto } from './dto/update-contestant-sanswer.dto';

@Injectable()
export class ContestantSanswerService {
  create(createContestantSanswerDto: CreateContestantSanswerDto) {
    return 'This action adds a new contestantSanswer';
  }

  findAll() {
    return `This action returns all contestantSanswer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contestantSanswer`;
  }

  update(id: number, updateContestantSanswerDto: UpdateContestantSanswerDto) {
    return `This action updates a #${id} contestantSanswer`;
  }

  remove(id: number) {
    return `This action removes a #${id} contestantSanswer`;
  }
}
