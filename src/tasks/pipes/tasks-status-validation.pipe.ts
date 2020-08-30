import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task.model";

export class TaskStatusValidationPipe implements PipeTransform {

  transform(value: any) {
    value = value.toUpperCase();
    if(!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status.`);
    }
    return value;
  }

  private isStatusValid(status: any): boolean {
    return TaskStatus[status];
  }
}