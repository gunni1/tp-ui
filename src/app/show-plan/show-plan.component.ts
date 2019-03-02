import { Component, OnInit } from '@angular/core';
import {Practice} from "../plan/practice";
import {ActivatedRoute, Router} from "@angular/router";
import {Plan} from "../plan/plan";
import {PlanService} from "../plan/plan.service";
import {handleError} from "../helpers";

@Component({
  selector: 'app-show-plan',
  templateUrl: './show-plan.component.html',
  styleUrls: ['./show-plan.component.css']
})
export class ShowPlanComponent implements OnInit {

  activeUserId = "user1"

  isFavorite = false
  plan: Plan

  constructor(
    private route: ActivatedRoute,
    private planService: PlanService,
    private router: Router
  ) { }

  ngOnInit() {
    this.plan = new Plan("","","",[])
    this.route.paramMap.subscribe(params => {
      var modelId = params.get('planId') || null
      if (modelId !== null) {
        this.initPlan(modelId)
        this.initFavorite(modelId, this.activeUserId)
      }
    });
  }

  favoriteChanged() {
    if(this.isFavorite) {
      this.removeFavorite(this.activeUserId, this.plan.id)
    }
    else {
      this.addFavorite(this.activeUserId, this.plan.id)
    }

  }

  private addFavorite(userId: string, planId: string) {
    this.planService.addFavorite(userId, planId).subscribe(
      favorites => {
        this.isFavorite = true
      },
      error => handleError(error)
    )
  }

  private removeFavorite(userId: string, planId: string) {
    this.planService.removeFavorite(userId, planId).subscribe(
      favorites => {
        this.isFavorite = false
      },
      error => handleError(error)
    )
  }

  private initPlan(planId: String) {
    this.planService.getPlan(planId).subscribe(
      plan => {
        this.plan = plan
      },
      error => {
        if(error.error.error === "NO_PLAN_FOUND") {
          this.router.navigateByUrl("/my-plans")
        }
        handleError(error);
      }
    )
  }

  private initFavorite(planId: string, activeUserId: string) {
    this.planService.getUserFavoritePlanIds(activeUserId).subscribe(
      planIds => {
        this.isFavorite = planIds.indexOf(planId) > -1
      },
      error => {
        handleError(error)
        this.isFavorite = false
      }
    )
  }

}
