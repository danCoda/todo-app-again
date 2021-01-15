import { Component, OnInit } from '@angular/core';
import { Todo } from "../../models/Todos";
import { TodoService } from "../../services/todo.service";
import { Location } from '@angular/common';
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  myTodos: Todo[];

  constructor(private todoService: TodoService, private location: Location) { }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(todos => {
      console.log("1", todos);
      this.myTodos = todos.map(d => {
        return {
          id: d.payload.doc.id,
          ...d.payload.doc.data()
        }
      }).sort((a, b) => a.timestamp - b.timestamp);
    });
  }

  deleteTodo(todo: Todo) {
    console.log(todo);
    // Update UI.
    this.myTodos = this.myTodos.filter(t => t.id !== todo.id);
    // Update server.
    this.todoService.deleteTodo(todo);
  }

  toggleTodo(todo: Todo) {
    console.log(todo);
    // Update UI.
    todo.completed = !todo.completed;
    // Update server.
    this.todoService.toggleCompleted(todo);
  }

  addTodo(todo: Todo) {
    /* this.todoService.addTodo(todo).subscribe(todo => {
      this.myTodos.push(todo);
    }) */
    this.todoService.addTodo(todo).then(doc => {
      todo.id = doc.id;
      this.myTodos.push(todo);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
