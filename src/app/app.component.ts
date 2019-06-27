import {Component, OnInit} from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'tp-ui';
  isCollapsed = true;
  isLoggedIn = false;

  constructor(protected keycloakAngular: KeycloakService,
              private router: Router) {
  }

  logout() {
    this.isLoggedIn = false;
    this.keycloakAngular.logout(window.location.origin).then(_ => this.router.navigateByUrl("/"))
  }

  ngOnInit(): void {
    this.keycloakAngular.isLoggedIn().then(
      isLoggedIn => {
        if (isLoggedIn) {
          this.isLoggedIn = true;
        }
      }
    )
  }
}
