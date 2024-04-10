import { IsNotEmpty } from 'class-validator';

export class infoProductDto {
  @IsNotEmpty()
  readonly productId: string;
  @IsNotEmpty()
  readonly quantity: number;
}
