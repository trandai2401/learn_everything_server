import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { Role } from 'src/role/entities/role.entity';
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
  ) {}

  create(createAccountDto: CreateAccountDto & Account) {
    const role = new Role();
    role.id = 3;
    createAccountDto.roles = [role];
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
    return res;
  }

  findAll() {
    return `This action returns all account`;
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
