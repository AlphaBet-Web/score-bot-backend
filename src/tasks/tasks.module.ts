import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskDocument } from './task.schema';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  controllers: [TasksController],
  imports: [
    TypegooseModule.forFeature([TaskDocument], 'tasks')
  ],
  providers: [TasksService]
})
export class TasksModule {}
