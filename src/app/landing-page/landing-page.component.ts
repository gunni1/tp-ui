import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material";
import { Auth } from 'aws-amplify';
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../user.service";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService) {  }

  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

  registerForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    email: new FormControl()
  });

  doLogin() {
    let username = this.loginForm.get('username').value;
    let password = this.loginForm.get('password').value;
    this.userService.signIn(username, password)
  }

  doSignUp() {
    let username = this.registerForm.get('username').value;
    let password = this.registerForm.get('password').value;
    let email = this.registerForm.get('email').value;
    this.userService.signUp(username, password, email);


  }

  ngOnInit() {
    // this.keycloakAngular.isLoggedIn().then(
    //   isLoggedIn => {
    //     if (isLoggedIn) {
    //       this.router.navigateByUrl("/my-plans")
    //     }
    //   }
    // )
  }

}
