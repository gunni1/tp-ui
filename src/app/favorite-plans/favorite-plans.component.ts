import { Component, OnInit } from '@angular/core';
import {Plan} from "../plan/plan";
import {PlanService} from "../plan/plan.service";
import {handleError} from "../helpers";
import {Router} from "@angular/router";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-favorite-plans',
  templateUrl: './favorite-plans.component.html',
  styleUrls: ['./favorite-plans.component.css']
})
export class FavoritePlansComponent implements OnInit {

  plans: Plan[] = []
  userName = ""

  constructor(
    private planService: PlanService,
    protected keycloakAngular: KeycloakService) { }

  ngOnInit() {
    let userProfilePromise = this.keycloakAngular.loadUserProfile();
    userProfilePromise.then(profile => this.userName = profile.username)
    userProfilePromise.then(profile => this.planService.getUserFavoritePlans(profile.username).subscribe(
      plans => {
        this.plans = plans
      },
      error => {
        handleError(error)
      }
    ))

  }
}
