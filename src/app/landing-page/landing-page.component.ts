import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material";
import { Auth } from 'aws-amplify';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  constructor(private router: Router) {  }

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

  }

  doSignUp() {
    let username = this.registerForm.get('username').value;
    let password = this.registerForm.get('password').value;
    let email = this.registerForm.get('email').value;
    Auth.signUp({
      username,
      password,
      attributes: {
        email,
      },
      validationData: []  //optional
    })
  }


  createUser() {
    console.log("create clicked");

    let username = "harry";
    let password = "geheim";
    let email = "harry@hirsch.de";

    Auth.signUp({
      username,
      password,
      attributes: {
        email,          // optional
      },
      validationData: []  //optional
    })
      .then(data => console.log(data))
      .catch(err => console.log(err));

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
