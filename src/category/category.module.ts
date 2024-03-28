import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaService } from 'src/prisma.service';
import { TaskService } from 'src/task/task.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService, TaskService],
})
export class CategoryModule {}
