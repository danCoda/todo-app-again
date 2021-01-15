import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodosComponent } from "./components/todos/todos.component";
import { AboutComponent } from "./components/pages/about/about.component";

const routes: Routes = [
  { path: "", redirectTo: '/Todos', pathMatch: 'full' },
  { path: "Todos", component: TodosComponent },
  { path: "About", component: AboutComponent },
  { path: "**", component: TodosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
