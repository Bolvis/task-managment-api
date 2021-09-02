import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { updateTaskDto } from './dto/update-task.dto';

import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) { }

    @Get()
    async getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
        if (Object.keys(filterDto).length) return await this.taskService.getFilteredTasks(filterDto);
        return await this.taskService.getAllTasks();
    }

    @Post()
    async name(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return await this.taskService.createTask(createTaskDto);
    }

    @Get('/:id')
    async getSingleTask(@Param('id') id: string): Promise<Task> {
        return await this.taskService.getSingleTask(id);
    }

    @Delete('/:id')
    async deleteTask(@Param('id') id: string): Promise<Task[]> {
        return await this.taskService.deleteTask(id);
    }

    @Patch('/:id')
    async updateTask(
        @Param('id') id: string,
        @Body() updateTaskDescriptionDto: updateTaskDto): Promise<Task> {
        
        return await this.taskService.updateTaskDescription(id, updateTaskDescriptionDto);
    }
}
