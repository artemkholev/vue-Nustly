export class OrderDto {
  readonly id: string;
  readonly order_date: Date;
  readonly ready_pay: boolean;
  readonly payment_status: string;
  readonly day_payment: Date;
  readonly phone: string;
  readonly address: string;
  readonly city: string;
  readonly region: string;
  readonly index: string;
  readonly name: string;
  readonly id_user: string;
}
