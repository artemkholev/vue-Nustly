import { IsNotEmpty } from 'class-validator';

export class CategoryDto {
  @IsNotEmpty()
  readonly title: string;
  readonly visibility: boolean;
  readonly photo: string;
}

export class DeleteCategoryDto {
  @IsNotEmpty()
  readonly id: string;
}
