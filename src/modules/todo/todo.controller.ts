import { Body, Controller, Get, Logger, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard/jwt-auth.guard';

@Controller('todo')
@UseGuards(JwtAuthGuard)
export class TodoController {
  private readonly logger = new Logger(TodoController.name);

  constructor(
    private todoService: TodoService,
  ) { }

  @Post()
  create(@Body() body: { title: string }, @Req() req) {
    this.logger.log(`Creating todo with title: ${body.title} for user: ${req.user.email}`);
    return this.todoService.create(body.title, req.email);
  }

  @Get()
  findAll(@Req() req) {
    return this.todoService.findAllByUser(req.email);
  }

  @Patch(':id/toggle')
  toggle(@Param('id') id: number, @Req() req) {
    return this.todoService.toggleCompleted(id, req.email);
  }
}
