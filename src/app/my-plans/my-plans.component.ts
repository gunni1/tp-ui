import { Component, OnInit } from '@angular/core';
import {Plan} from "../plan/plan";
import {PlanService} from "../plan/plan.service";
import {ActivatedRoute, Router} from "@angular/router";
import {handleError} from "../helpers";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-my-plans',
  templateUrl: './my-plans.component.html',
  styleUrls: ['./my-plans.component.css']
})
export class MyPlansComponent implements OnInit {

  plans: Plan[] = []
  userName = ""

  constructor(
    private planService: PlanService,
    protected keycloakAngular: KeycloakService) { }

  ngOnInit() {
    let userProfilePromise = this.keycloakAngular.loadUserProfile();
    userProfilePromise.then(profile => this.userName = profile.username)
    userProfilePromise.then(profile => this.planService.getUsersPlans(profile.username).subscribe(
      plans => {
        this.plans = plans
      },
      error => {
        handleError(error)
      }
    ))
  }
}
