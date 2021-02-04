/*
  The important code for logging-in, signing-up or logging-out are:
  — import 'AuthService'
  — declare variable 'email' and 'password'
  — inject service 'authService' at constructor
  — method for signup()
  — method for login()
  — method for logout()
*/

import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  email: string;
  password: string;
  displayName: string;

  constructor(public authService: AuthService) { }
  ngOnInit(): void {
  }
  signup() {
    this.authService.signup(this.email, this.password, this.displayName);
    this.email = this.password = this.displayName = '';
  }

  login() {
    this.authService.login(this.email, this.password).then(() => {
      this.setDisplayName();
    });
    this.email = this.password = this.displayName = '';
  }

  logout() {
    this.authService.logout();
  }

  setDisplayName() {
    this.authService.getUserDetails().then(details => {
      this.displayName = details.payload.data().displayName;
    });
  }
}
