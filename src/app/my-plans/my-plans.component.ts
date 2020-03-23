import { Component, OnInit } from '@angular/core';
import {Plan} from "../plan/plan";
import {PlanService} from "../plan/plan.service";
import {ActivatedRoute, Router} from "@angular/router";
import {handleError} from "../helpers";
import {UserService} from "../user.service";

@Component({
  selector: 'app-my-plans',
  templateUrl: './my-plans.component.html',
  styleUrls: ['./my-plans.component.css']
})
export class MyPlansComponent implements OnInit {

  plans: Plan[] = [];
  userName = "";

  constructor(
    private planService: PlanService,
    private userService: UserService) { }

  ngOnInit() {
    this.userName = this.userService.getUsername();
    this.planService.getUsersPlans(this.userName).subscribe(
      plans => {
        this.plans = plans
      },
      error => {
        handleError(error)
      }
    )
  }
}
