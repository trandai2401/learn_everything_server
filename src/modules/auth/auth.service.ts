import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AccountService } from '../account/account.service';
import { log } from 'console';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.accountService.findOneByEmail(email);
    console.log(user, email, pass);

    if (!(await bcrypt.compare(pass, user?.password))) {
      throw new UnauthorizedException();
    }

    const { password, id, verify, activity, roles, ...result } = user;

    const rolesArr = roles.map((role) => role.name);
    const payload = {
      username: user.fullName,
      sub: user.id,
      ...result,
      roles: rolesArr,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
