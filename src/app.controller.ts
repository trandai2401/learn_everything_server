import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Storage } from '@google-cloud/storage';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('postFile')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const storage = new Storage({});
    const bucketName = 'learn_everything';
    const videoBuffer = file.buffer; // Dữ liệu video dưới dạng buffer

    console.log(file.buffer);
  }
  saveVideo(): string {
    return this.appService.getHello();
  }
}
