import { Category, Priority } from '@prisma/client';
import { IsString, IsEnum } from 'class-validator';


export class CreateTaskDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  date: string;

  @IsEnum(Priority)
  priority: Priority;

  @IsString()
  category: string;
}
