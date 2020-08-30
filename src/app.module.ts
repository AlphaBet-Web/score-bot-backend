import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypegooseModule } from "nestjs-typegoose";

@Module({
  imports: [
    TasksModule,
    TypegooseModule.forRoot("mongodb://localhost:27017/tasks", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectionName: 'tasks'
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}