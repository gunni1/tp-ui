import { Component, OnInit } from '@angular/core';
import {Plan} from "../plan/plan";
import {PlanService} from "../plan/plan.service";
import {ActivatedRoute, Router} from "@angular/router";
import {handleError} from "../helpers";

@Component({
  selector: 'app-my-plans',
  templateUrl: './my-plans.component.html',
  styleUrls: ['./my-plans.component.css']
})
export class MyPlansComponent implements OnInit {

  plans: Plan[] = []
  userIdDummy = "user1"

  constructor(
    private planService: PlanService,
    private router: Router,) { }

  ngOnInit() {
    this.planService.getUsersPlans(this.userIdDummy).subscribe(
      plans => {
        this.plans = plans
      },
      error => {
        handleError(error)
      }
    )
  }

}
