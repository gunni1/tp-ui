import { Component, OnInit } from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {


  constructor(protected keycloakAngular: KeycloakService,
              private router: Router) {
  }

  ngOnInit() {
    this.keycloakAngular.isLoggedIn().then(
      isLoggedIn => {
        if (isLoggedIn) {
          this.router.navigateByUrl("/my-plans")
        }
      }
    )
  }

}
