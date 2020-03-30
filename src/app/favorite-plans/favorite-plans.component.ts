import { Component, OnInit } from '@angular/core';
import {Plan} from "../plan/plan";
import {PlanService} from "../plan/plan.service";
import {handleError} from "../helpers";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {UserService} from "../user.service";

@Component({
  selector: 'app-favorite-plans',
  templateUrl: './favorite-plans.component.html',
  styleUrls: ['./favorite-plans.component.css']
})
export class FavoritePlansComponent implements OnInit {

  plans: Plan[] = []
  currentUserName = "";

  constructor(
    private planService: PlanService,
    private userService: UserService) { }

  ngOnInit() {
    this.userService.getCurrentUserUsername().then( user => {
      this.planService.getUserFavoritePlans(user).subscribe(
        plans => {
          this.plans = plans
          this.currentUserName = user
        },
        error => {
          handleError(error)
        }
      )
    })

  }


}
