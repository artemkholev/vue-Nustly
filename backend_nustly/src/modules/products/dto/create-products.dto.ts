import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  readonly title: string;
  @IsNotEmpty()
  readonly description: string;
  readonly manufacturer: string;
  @IsNotEmpty()
  readonly price: number;
  @IsNotEmpty()
  readonly photo: string;
  @IsNotEmpty()
  readonly id_category: string;
  readonly id_model: string;
  readonly id_provider: string;
}
