import { Role } from 'src/role/entities/role.entity';

export class CreateAccountDto {
  id?: number;
  fullName: string;
  email: string;
  phone: string;
  roles?: Array<Role>;
}
