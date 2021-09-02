import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {



    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getFilteredTasks(filterDto: GetTasksFilterDto): Task[] {
        const { status, search } = filterDto;
        let tasks = this.getAllTasks();
        if (status) {
            tasks = tasks.filter((task: Task) => task.status === status.toUpperCase())
        }
        if (search) {
            console.log('search')
            tasks = tasks.filter((task: Task) => task.title.toLowerCase().includes(search.toLowerCase())
                || task.description.toLowerCase().includes(search.toLowerCase()))
        }
        return tasks

    }

    getSingleTask(id: string): Task {
        return this.tasks.find((task: Task) => task.id === id)
    }
    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task)
        return task;
    }
    deleteTask(id: string): Task[] {
        this.tasks = this.tasks.filter((task: Task) => task.id !== id)
        return this.tasks;
    }
    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = { ...this.getSingleTask(id), status: status };
        this.deleteTask(id);
        this.tasks.push(task)
        return task;
    }
}
