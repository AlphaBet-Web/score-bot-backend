import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { get } from 'http';
import { TaskStatusValidationPipe } from './pipes/tasks-status-validation.pipe';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(
        private tasksService: TasksService
    ) {}

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
        if (Object.keys(filterDto).length) {
            console.log('filter');
            return this.tasksService.getFilteredTasks(filterDto);
        }
        return this.tasksService.getAllTasks();
    }
    // getAllTasks(): Task[] {
    //     return this.tasksService.getAllTasks();
    // }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.createTask(createTaskDto);
    }
    // @Post()
    // createTask(
    //     @Body('title') title,
    //     @Body('description') description
    // ): Task {
    //     return this.tasksService.createTask(title, description);
    // }

    @Patch('/:id/status')
    updateTaskById(
        @Param('id') id: string,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus
    ): Task {
        return this.tasksService.updateTaskById(id, status);
    }
    // @Patch('/:id')
    // updateTaskById(
    //     @Param('id') id: string,
    //     @Body('status') status: TaskStatus
    // ): Task {
    //     return this.tasksService.updateTaskById(id, status);
    // }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string): Task {
        return this.tasksService.deleteTaskById(id);
    }
}
