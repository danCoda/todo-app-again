import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'; 
import { Todo } from 'src/app/models/Todos';
import { TodoService} from "../../services/todo.service";

@Component({
  selector: '[app-todo]',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  @Input() todo: Todo; // We do this so we can use Todo, which are coming from todos.
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();
  @Output() toggleTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService:TodoService) { }

  ngOnInit(): void {
  }

  setClasses() {
    return {
      "is-complete": this.todo.completed
    }
  }

  /* onToggle(todo: Todo): void {
    this.todoService.toggleCompleted(todo).subscribe(todo => {
      console.log(todo);
    })
  } */
  onToggle(todo: Todo): void {
    this.toggleTodo.emit(todo);
  }

  onDelete(todo: Todo): void {
    this.deleteTodo.emit(todo);
  }
}
