import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { LearnedService } from './learned.service';
import { CreateLearnedDto } from './dto/create-learned.dto';
import { UpdateLearnedDto } from './dto/update-learned.dto';

@Controller('learned')
export class LearnedController {
  constructor(private readonly learnedService: LearnedService) {}

  @Post()
  create(@Body() createLearnedDto: CreateLearnedDto, @Request() req) {
    return this.learnedService.create({
      ...createLearnedDto,
      accountId: req['user'].sub,
    });
  }

  @Get()
  findAll() {
    return this.learnedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.learnedService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLearnedDto: UpdateLearnedDto) {
    return this.learnedService.update(+id, updateLearnedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.learnedService.remove(+id);
  }
}
