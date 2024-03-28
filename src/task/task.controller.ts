import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';
import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Put,
  Param,
  Body,
  Delete,
  HttpCode,
  Get,
} from '@nestjs/common';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @HttpCode(200)
  async getAll() {
    return await this.taskService.getAll();
  }

  @Get(':id')
  @HttpCode(200)
  async getById(@Param('id') id: string) {
    return await this.taskService.getById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  async create(@Body() dto: CreateTaskDto) {
    return await this.taskService.create(dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return await this.taskService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(200)
  async delete(@Param('id') id: string) {
    return await this.taskService.delete(id);
  }
}
