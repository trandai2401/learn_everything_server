import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { ItemType } from '../item-type/entities/item-type.entity';
import { LectureService } from '../lecture/lecture.service';
import { Lecture } from '../lecture/entities/lecture.entity';
import { Section } from '../section/entities/section.entity';
import { QuestionService } from '../question/question.service';
import { readJSON } from 'fs-extra';
import { TestResult } from '../test-result/entities/test-result.entity';
import { Account } from '../account/entities/account.entity';
import { ContestantSanswer } from '../contestant-sanswer/entities/contestant-sanswer.entity';
import { Question } from '../question/entities/question.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private itemRepository: Repository<Item>,
    @InjectRepository(TestResult)
    private testResultRepository: Repository<TestResult>,
    private lectureService: LectureService,
    private questionService: QuestionService,
    @InjectRepository(ContestantSanswer)
    private contstantRepository: Repository<ContestantSanswer>,
  ) {}

  async create(createItemDto: CreateItemDto & Item, file: Express.Multer.File) {
    const itemType = new ItemType();
    itemType.id = createItemDto.itemTypeId;
    createItemDto.typeItem = itemType;
    const section = new Section();
    section.id = createItemDto.sectionId;
    createItemDto.section = section;
    const item = await this.itemRepository.save(createItemDto);
    if (createItemDto.itemTypeId == 1) {
      const lecture = await this.lectureService.create(
        new Lecture(),
        file,
        item,
      );
    }
    // const fileContent = await readJSON(file.path);
    // console.log(JSON.parse(file.buffer.toString('utf8')));

    if (createItemDto.itemTypeId == 2) {
      const prms = [];
      const qs = JSON.parse(file.buffer.toString('utf8'));
      qs.forEach((question) => {
        prms.push(this.questionService.create(question, item));
      });
      await Promise.all(prms);
      // this.questionService.create();
    }
    // item.lecture = lecture;
    // return lecture;

    return await this.itemRepository.save(item);
  }

  async check(body, userId) {
    const { itemId, ...ans } = body;
    const testResult = new TestResult();

    const item = new Item();
    item.id = +itemId;
    console.log(itemId, userId, ans);

    const account = new Account();
    account.id = +userId;

    testResult.item = item;
    testResult.account = account;

    const tr = await this.testResultRepository.save(testResult);

    const promi = [];
    Object.keys(ans).forEach((id) => {
      const con = new ContestantSanswer();
      con.answer = ans[id];
      const ques = new Question();
      ques.id = +id;

      con.question = ques;

      con.testResult = tr;
      promi.push(this.contstantRepository.save(con));
    });
    await Promise.all(promi);
    const res = await this.testResultRepository.findOne({
      where: { id: tr.id },
      relations: {
        contestantSAnswers: { question: true },
      },
    });
    const point = res.contestantSAnswers.reduce((pre, conA) => {
      if (conA.answer == conA.question.correctAnswer) return pre + 1;
      return pre;
    }, 0);

    res['point'] = point;
    return res;
  }

  findAll() {
    return `This action returns all item`;
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
