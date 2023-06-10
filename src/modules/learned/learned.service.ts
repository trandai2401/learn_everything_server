import { Injectable } from '@nestjs/common';
import { CreateLearnedDto } from './dto/create-learned.dto';
import { UpdateLearnedDto } from './dto/update-learned.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Learned } from './entities/learned.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LearnedService {
  constructor(
    @InjectRepository(Learned) private learnedRepository: Repository<Learned>,
  ) {}
  create(createLearnedDto: CreateLearnedDto) {
    return this.learnedRepository.save(createLearnedDto);
  }

  findAll() {
    return `This action returns all learned`;
  }

  findOne(id: number) {
    return `This action returns a #${id} learned`;
  }

  update(id: number, updateLearnedDto: UpdateLearnedDto) {
    return `This action updates a #${id} learned`;
  }

  remove(id: number) {
    return `This action removes a #${id} learned`;
  }
}
