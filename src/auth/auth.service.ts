import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly accountService: AccountService) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.accountService.findOneByEmail(email);
    return user;
    // if (!(await bcrypt.compare(pass, user?.password))) {
    //   throw new UnauthorizedException();
    // }
    const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
  }
}
