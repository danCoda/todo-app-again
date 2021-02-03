/*
  The important code for logging-in, signing-up or logging-out are:
  — import 'AuthService'
  — declare variable 'email' and 'password'
  — inject service 'authService' at constructor
  — method for signup()
  — method for login()
  — method for logout()
*/

import { Component } from '@angular/core';
import { AuthService } from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'todo-app-again';
  email: string;
  password: string;

  constructor(public authService: AuthService) { }

  signup() {
    this.authService.signup(this.email, this.password);
    this.email = this.password = '';
  }

  login() {
    this.authService.login(this.email, this.password);
    this.email = this.password = '';
  }

  logout() {
    this.authService.logout();
  }
}
