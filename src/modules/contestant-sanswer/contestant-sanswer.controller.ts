import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContestantSanswerService } from './contestant-sanswer.service';
import { CreateContestantSanswerDto } from './dto/create-contestant-sanswer.dto';
import { UpdateContestantSanswerDto } from './dto/update-contestant-sanswer.dto';

@Controller('contestant-sanswer')
export class ContestantSanswerController {
  constructor(private readonly contestantSanswerService: ContestantSanswerService) {}

  @Post()
  create(@Body() createContestantSanswerDto: CreateContestantSanswerDto) {
    return this.contestantSanswerService.create(createContestantSanswerDto);
  }

  @Get()
  findAll() {
    return this.contestantSanswerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contestantSanswerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContestantSanswerDto: UpdateContestantSanswerDto) {
    return this.contestantSanswerService.update(+id, updateContestantSanswerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contestantSanswerService.remove(+id);
  }
}
