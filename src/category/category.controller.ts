import {
  Controller,
  Get,
  HttpCode,
  Post,
  ValidationPipe,
  UsePipes,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @HttpCode(200)
  async getAll() {
    return await this.categoryService.getAll();
  }

  @Post()
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: CategoryDto) {
    return await this.categoryService.create(dto);
  }

  @Put(':id')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() dto: CategoryDto) {
    return await this.categoryService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(200)
  async delete(@Param('id') id: string) {
    return await this.categoryService.delete(id);
  }
}
