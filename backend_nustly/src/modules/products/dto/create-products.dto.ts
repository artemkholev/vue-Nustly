import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  readonly id_categories: string;
  @IsNotEmpty()
  readonly title: string;
  @IsNotEmpty()
  readonly description: string;
  readonly manufacturer: string;
  @IsNotEmpty()
  readonly price: number;
}
