import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Request, Response } from 'express';
import config from './config';
import { createHmac } from 'crypto';
import { Public } from 'src/decorators/auth';
import { formatDateTime } from 'src/utils';
import * as qs from 'qs';
import { CartService } from '../cart/cart.service';
import { ItemPayment } from '../item-payment/entities/item-payment.entity';
import { Cart } from '../cart/entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './enitites/payment.entity';
import { Repository } from 'typeorm';
@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly cartService: CartService,
    @InjectRepository(ItemPayment)
    private itemPaymentRepository: Repository<ItemPayment>,
  ) {}

  @Post()
  @Public()
  async create(@Req() req: Request, @Res() res: Response) {
    // return { a: 'demo' };
    process.env.TZ = 'Asia/Ho_Chi_Minh';

    const date: Date = new Date();
    const createDate = formatDateTime(date);

    const ipAddr =
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress;
    // req.connection?.socket?.remoteAddress;

    const tmnCode = config['vnp_TmnCode'];
    const secretKey = config['vnp_HashSecret'];
    let vnpUrl = config['vnp_Url'];
    const returnUrl = config['vnp_ReturnUrl'];

    const payment = await this.paymentService.create(+req.body['userId']);
    const orderId = payment.id;
    const amount = payment.total;

    const carts = await this.cartService.findOne(+req.body['userId']);

    const itemPayments = await carts.map((cart) => {
      const itemPayment = new ItemPayment();

      itemPayment.cart = { accountId: cart.accountId, courseId: cart.courseId };

      itemPayment.payment = payment;
      itemPayment.price = cart.course.price;
      this.itemPaymentRepository.save(itemPayment);

      return itemPayment;
    });

    const bankCode = req.body.bankCode;
    console.log(itemPayments, 11);

    let locale = req.body.language;
    if (locale === null || locale === '') {
      locale = 'vn';
    }
    const currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if (bankCode !== null && bankCode !== '') {
      vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = this.sortObject(vnp_Params);

    const signData = qs.stringify(vnp_Params, { encode: false });
    // const crypto = crypto;
    const hmac = createHmac('sha512', secretKey);
    const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + qs.stringify(vnp_Params, { encode: false });
    res.redirect(vnpUrl);
  }

  @Get('vnpay_return')
  @Public()
  getResult(@Req() req: Request, @Res() res: Response) {
    let vnp_Params = req.query;

    const secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = this.sortObject(vnp_Params);
    const paymentId = req.query['vnp_TxnRef'];
    this.paymentService.payment(paymentId);
    const tmnCode = config['vnp_TmnCode'];
    const secretKey = config['vnp_HashSecret'];

    const signData = qs.stringify(vnp_Params, { encode: false });

    const hmac = createHmac('sha512', secretKey);
    const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

    if (secureHash === signed) {
      //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

      return res.redirect('http://localhost:3000/course-management');
    } else {
      return res.status(200).json('97');
    }
  }

  sortObject(obj) {
    const sorted = {};
    const str = [];
    let key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
      }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
      sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
    }
    return sorted;
  }

  generateRandomString() {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters[randomIndex];
    }

    return randomString;
  }
}
