import { Component } from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tp-ui';
  isCollapsed = true;

  constructor(protected keycloakAngular: KeycloakService,
              private router: Router) {
  }

  logout() {
    this.keycloakAngular.logout().then(_ => this.router.navigateByUrl("/"))
  }
}
