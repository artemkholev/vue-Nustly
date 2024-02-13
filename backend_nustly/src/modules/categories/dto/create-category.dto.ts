import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  readonly title: string;
  @IsNotEmpty()
  readonly visibility: boolean;
}
