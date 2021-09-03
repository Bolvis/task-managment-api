import { IsEnum, IsNotEmpty, IsOptional, Length } from "class-validator";
import { TaskStatus } from "../task.model";

export class updateTaskDto{
    @IsNotEmpty()
    @Length(1, 20)
    @IsOptional()
    title?: string;

    @IsOptional()
    @IsNotEmpty()
    description?: string;

    @IsEnum(TaskStatus)
    @IsOptional()
    status?:TaskStatus;
}