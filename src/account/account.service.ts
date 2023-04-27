import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { Role } from 'src/role/entities/role.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { LazyModuleLoader } from '@nestjs/core';

function extractString(inputString: string): string | null {
  const match = inputString.match(/'([^']+)'/);
  if (match) {
    return match[1];
  } else {
    return null;
  }
}

interface MyObject {
  [key: string]: any;
}

function findKeyByValue(obj: MyObject, value: string): string | null {
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] == value) {
      return key;
    }
  }
  return null;
}
type InsertError = {
  code: string;
  sqlMessage: string;
} & Error;

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,
    private readonly mailerService: MailerService,
    private lazyModuleLoader: LazyModuleLoader,
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    const randomString: string = uuidv4();

    const password: string = randomString.substring(0, 12);
    const hashPassword = await bcrypt.hash(password, 10);

    const role = new Role();
    role.id = 3;
    createAccountDto.roles = [role];
    createAccountDto.password = hashPassword;

    const res = this.accountsRepository
      .save(createAccountDto)
      .catch((error: InsertError) => {
        if (error.code === 'ER_DUP_ENTRY') {
          const duplicateValue = extractString(error.sqlMessage);
          const duplicateKey = findKeyByValue(createAccountDto, duplicateValue);
          throw new HttpException(
            {
              message: `${duplicateValue} đã được sử dụng`,
              field: duplicateKey,
            },
            HttpStatus.BAD_REQUEST,
          );
        } else {
          throw new HttpException(
            {
              message: 'Đã có lỗi xảy ra',
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      });
    const resSendMail = this.mailerService.sendMail({
      to: 'a01225568931@gmail.com',
      subject: 'demo',
      template: './welcome',
      context: {
        name: createAccountDto.fullName,
        password: password,
      },
    });
    return res;
  }

  findAll() {
    return `This action returns all account`;
  }

  findOne(id: number) {
    // return this.accountsRepository.findOne()
  }
  async findOneByEmail(email: string): Promise<any> {
    const account = await this.accountsRepository.findOne({
      where: { email: email },
      relations: {
        roles: true,
      },
      select: {
        verify: false,
        activity: false,
        roles: {
          name: true,
        },
      },
    });
    return account;
  }
  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
