import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccountModule } from 'src/account/account.module';

@Module({
  imports: [AccountModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
