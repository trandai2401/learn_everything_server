import { PartialType } from '@nestjs/mapped-types';
import { CreateItemPaymentDto } from './create-item-payment.dto';

export class UpdateItemPaymentDto extends PartialType(CreateItemPaymentDto) {}
