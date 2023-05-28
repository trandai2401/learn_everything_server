import { Comment } from '../entities/comment.entity';

export class CreateCommentDto extends Comment {
  accountId: number;
  courseId: number;
}
