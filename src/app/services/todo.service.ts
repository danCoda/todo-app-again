import { Injectable } from '@angular/core';
import { Todo } from "../models/Todos";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})



export class TodoService {
  todosUrl = "https://jsonplaceholder.typicode.com/todos";
  params = "?_limit=5";

  constructor(private http: HttpClient, private firestore: AngularFirestore) { }

  /* getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.todosUrl}${this.params}`);
  } */
  getTodos(): Observable<any> {
    return this.firestore.collection("todos").get();
  }

  toggleCompleted(todo: Todo) {
  /* toggleCompleted(todo: Todo): Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`
    return this.http.put<Todo[]>(url, todo, httpOptions); */
    console.log("Hi: ", todo);
    this.firestore.collection("todos").doc(todo.id).update({
      "completed": todo.completed
    });
  }

  /* deleteTodo(todo: Todo): Observable<Todo> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.delete<Todo>(url, httpOptions);
  } */
  deleteTodo(todo: Todo): void {
    this.firestore.collection("todos").doc(todo.id).delete();
  }

  /* addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  } */
  addTodo(todo: Todo) {
    return this.firestore.collection("todos").add(todo);
  }
}
