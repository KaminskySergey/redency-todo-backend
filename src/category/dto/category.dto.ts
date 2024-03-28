import { IsOptional, IsString } from 'class-validator';

export class CategoryDto {
  @IsString()
  @IsOptional()
  name: string;
}
