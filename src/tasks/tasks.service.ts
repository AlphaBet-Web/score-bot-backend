import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectModel } from 'nestjs-typegoose';
import { TaskDocument } from './task.schema';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class TasksService {

    constructor(
        @InjectModel(TaskDocument) private readonly taskModel: ReturnModelType<typeof TaskDocument>
    ) {}

    async getAllTasks(): Promise<TaskDocument[] | null> {
        return await this.taskModel.find().exec();
    }

    async getTaskById(id: string): Promise<TaskDocument | null> {
        const found = await this.taskModel.findOne({id});
        if(!found) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return found;
    }

    async getFilteredTasks(filterDto: GetTasksFilterDto): Promise<TaskDocument[] | null> {
        const { status, search } = filterDto;
        console.log(filterDto);
        let query: {[k: string]: any} = {};
        if (status) {
            query.status = status;
        }
        if (search) {
            query.title = {$regex:search,$options:"i"}
        }
        return await this.taskModel.find(query);
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<TaskDocument> {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: uuidv4(),
            title,
            description,
            status: TaskStatus.OPEN
        };
        const createdCat = new this.taskModel(task);
        return await createdCat.save();
    }

    async updateTaskById(id: string, status: TaskStatus): Promise<TaskDocument | null> {
        return await this.taskModel.findOneAndUpdate({ id }, { status });
    }

    async deleteTaskById(id: string): Promise<TaskDocument | null> {
        return await this.taskModel.findOneAndDelete({ id });
    }

}
