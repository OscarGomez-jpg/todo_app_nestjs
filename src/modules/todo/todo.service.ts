import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo/todo';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class TodoService {
  private readonly logger = new Logger(TodoService.name);

  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) { }

  async create(title: string, user: User): Promise<Todo> {

    const todo = this.todoRepository.create({ title, owner: user });

    this.logger.log(`Creating todo with title: ${JSON.stringify(todo)}`)
    return this.todoRepository.save(todo);
  }

  async findAllByUser(user: User) {
    this.logger.log(`Service: ${JSON.stringify(user)}`)
    return this.todoRepository.find({ where: { owner: user } });
  }

  async toggleCompleted(id: number, user: User) {
    const todo = await this.todoRepository.findOne({ where: { id, owner: user } });
    if (!todo) return null;
    todo.completed = !todo.completed;
    return this.todoRepository.save(todo);
  }
}
