import { Request, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthGuardCmt } from '../auth/guards/auth_gateway.guard';
import { CommentService } from '../comment/comment.service';
import { Account } from '../account/entities/account.entity';
import { Course } from './entities/course.entity';
import { CreateCommentDto } from '../comment/dto/create-comment.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class CourseGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly commentService: CommentService) {}

  @SubscribeMessage('events')
  findAll(
    @MessageBody() data: any,
    @ConnectedSocket() socket: Socket,
  ): Observable<WsResponse<number>> {
    return from([1]).pipe(map((item) => ({ event: 'events', data: item })));
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number) {
    setTimeout(() => {
      this.server.emit('my_id', { data: 'Xin Chào bạn' });
    }, 3000);
  }

  @SubscribeMessage('comment')
  @UseGuards(AuthGuardCmt)
  async createComment(@Request() req, @MessageBody() data) {
    const newComment = await this.commentService.create({
      accountId: req.user.sub as number,
      content: data.content as string,
      courseId: data.courseId as number,
      id: 0,
      account: new Account(),
      course: new Course(),
    } as CreateCommentDto);

    this.server.emit(`course:${data.courseId}`, newComment);
    // console.log(newComment);

    // setTimeout(() => {
    //   this.server.emit('my_id', { data: `Xin Chào bạn ${req.user.sub}` });
    // }, 3000);
    return;
  }
}
