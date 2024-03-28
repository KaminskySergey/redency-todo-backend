import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}
  async getAll() {
    return await this.prisma.task.findMany({
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        name: true,
        description: true,
        date: true,
        priority: true,
        category: true,
      },
    });
  }

  async getById(id: string) {
    return await this.prisma.task.findUnique({ where: { id } });
  }

  async create(dto: CreateTaskDto) {
    const { name, date, description, category, priority } = dto;
    return await this.prisma.task.create({
      data: {
        name,
        date,
        description,
        priority,
        category,
      },
    });
  }

  async update(id: string, dto: UpdateTaskDto) {
    const { name, date, description, category, priority } = dto;
    await this.getByIdTask(id);
    return await this.prisma.task.update({
      where: { id },
      data: {
        name,
        date,
        description,
        priority,
        category,
      },
    });
  }

  async delete(id: string) {
    await this.getByIdTask(id);
    const task = await this.prisma.task.delete({
      where: { id },
    });

    return task;
  }

  private async getByIdTask(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }
}
