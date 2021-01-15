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
  constructor(private http: HttpClient, private firestore: AngularFirestore) { }

  getTodos(): Observable<any> {
    //return this.firestore.collection("todos").get();
    return this.subscribeToChanges();
  }

  subscribeToChanges(): Observable<any> {
    return this.firestore.collection("todos").snapshotChanges();
  }

  toggleCompleted(todo: Todo) {
    console.log("Hi: ", todo);
    this.firestore.collection("todos").doc(todo.id).update({
      "completed": todo.completed
    });
  }

  deleteTodo(todo: Todo): void {
    this.firestore.collection("todos").doc(todo.id).delete();
  }

  addTodo(todo: Todo) {
    return this.firestore.collection("todos").add({
      timestamp: Date.now(),
      ...todo
    });
  }
}
