import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  constructor(
    private router: Router) {  }

  signUpConfig = {
    header: 'Registration',
    hideAllDefaults: true,
    defaultCountryCode: '1',
    signUpFields: [
      {
        label: 'Username',
        key: 'username',
        required: true,
        displayOrder: 1,
        type: 'string',
      },
      {
        label: 'Password',
        key: 'password',
        required: true,
        displayOrder: 2,
        type: 'password'
      },
      {
        label: 'E-Mail',
        key: 'email',
        required: true,
        displayOrder: 3,
        type: 'string',
      }
    ]
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
