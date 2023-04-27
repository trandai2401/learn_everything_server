import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.accountService.findOneByEmail(email);
    if (!(await bcrypt.compare(pass, user?.password))) {
      throw new UnauthorizedException();
    }

    const { password, id, verify, activity, __roles__, ...result } = user;

    const roles = __roles__.map((role) => role.name);
    const payload = {
      username: user.fullName,
      sub: user.id,
      ...result,
      roles,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
