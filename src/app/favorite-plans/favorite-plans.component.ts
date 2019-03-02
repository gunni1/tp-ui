import { Component, OnInit } from '@angular/core';
import {Plan} from "../plan/plan";
import {PlanService} from "../plan/plan.service";
import {handleError} from "../helpers";

@Component({
  selector: 'app-favorite-plans',
  templateUrl: './favorite-plans.component.html',
  styleUrls: ['./favorite-plans.component.css']
})
export class FavoritePlansComponent implements OnInit {

  plans: Plan[] = []
  userIdDummy = "user1"

  constructor(
    private planService: PlanService) { }

  ngOnInit() {
    this.planService.getUserFavoritePlans(this.userIdDummy).subscribe(
      plans => {
        this.plans = plans
      },
      error => {
        handleError(error)
      }
    )
  }
}
