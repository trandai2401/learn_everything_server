import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../account/entities/account.entity';
import { Course } from '../course/entities/course.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const newComment = new Comment();

    const account = new Account();
    account.id = createCommentDto.accountId;

    const course = new Course();
    course.id = createCommentDto.courseId;

    newComment.content = createCommentDto.content;
    newComment.account = account;
    newComment.course = course;

    const commentSaved = await this.commentRepository.save(newComment);
    const comment = await this.commentRepository.findOne({
      where: {
        id: commentSaved.id,
      },
      relations: {
        account: {
          avatar: true,
        },
      },

      select: {
        account: { fullName: true },
      },
    });

    return comment;
  }

  findAllByCourseId = async (courseId) => {
    return this.commentRepository.find({
      where: { course: { id: courseId } },
      relations: {
        account: {
          avatar: true,
        },
      },
      select: {
        account: { fullName: true },
      },
      order: { id: 'DESC' },
    });
  };
  findAll() {
    return `This action returns all comment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
