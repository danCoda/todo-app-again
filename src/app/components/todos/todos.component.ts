import { Component, OnInit } from '@angular/core';
import { Todo } from "../../models/Todos";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  myTodos: Todo[];

  constructor() { }

  ngOnInit(): void {
    this.myTodos = [
      {
        id: 1,
        title: "Eat banana",
        completed: false
      },
      {
        id: 2,
        title: "Eat tree",
        completed: true
      },
      {
        id: 3,
        title: "Eat computer",
        completed: false
      }
    ]
  }

}
