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

  constructor(private http: HttpClient, private firestore:AngularFirestore) {
    console.log("Hey");
   this.playWithDB().subscribe(snap => {
     console.log(snap);
     console.log(snap.docs[0].data());
    
   })
   //dog.forEach(data => console.log(data.docs.forEach(doc => console.log(doc))));
  }

  playWithDB():Observable<any> {
    return this.firestore.collection("hello").get();
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.todosUrl}${this.params}`);
  }

  toggleCompleted(todo: Todo): Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`
    return this.http.put<Todo[]>(url, todo, httpOptions);
  }

  deleteTodo(todo: Todo): Observable<Todo> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.delete<Todo>(url, httpOptions);

  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }
}
