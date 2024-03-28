import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CategoryDto } from './dto/category.dto';
import { TaskService } from 'src/task/task.service';

@Injectable()
export class CategoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly taskService: TaskService,
  ) {}

  async getAll() {
    return await this.prisma.category.findMany();
  }

  async create(dto: CategoryDto) {
    return await this.prisma.category.create({
      data: {
        name: dto.name,
      },
    });
  }

  async update(id: string, dto: CategoryDto) {
    const currentCategory = await this.getByIdCategory(id);
    const update = await this.prisma.category.update({
      where: { id },
      data: {
        name: dto.name,
      },
    });
    await this.prisma.task.updateMany({
      where: { category: currentCategory.name },
      data: {
        category: dto.name,
      },
    });
    return update;
  }

  async delete(id: string) {
    const currentCategory = await this.getByIdCategory(id);
    await this.prisma.category.delete({
      where: { id },
    });
    await this.prisma.task.deleteMany({
      where: { category: currentCategory.name },
    });
    return { data: `Success category ${id} delete` };
  }

  private async getByIdCategory(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('Task not found');
    }

    return category;
  }
}
