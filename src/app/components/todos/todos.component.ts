import { Component, OnInit } from '@angular/core';
import { Todo } from "../../models/Todos";
import { TodoService } from "../../services/todo.service";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  myTodos: Todo[];

  constructor(private todoService:TodoService) { }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(todos => {
      this.myTodos = todos;
    });
  }

  deleteTodo(todo: Todo) {
    // Update UI.
    this.myTodos = this.myTodos.filter(t => t.id !== todo.id);
    // Update server.
    this.todoService.deleteTodo(todo).subscribe();
  }
}
