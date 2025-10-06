import { forwardRef, Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { Todo } from './entities/todo/todo';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Todo]),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule)
  ],
  providers: [TodoService],
  controllers: [TodoController]
})
export class TodoModule { }
