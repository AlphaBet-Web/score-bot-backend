import { prop } from "@typegoose/typegoose";
import { TaskStatus, Task } from "./task.model";

export class TaskDocument implements Task {
  @prop({ unique: true })
  id: string;

  @prop({ required: true })
  title: string;

  @prop({ required: true })
  description: string;

  @prop({ type: String, enum: TaskStatus })
  status: TaskStatus;
}