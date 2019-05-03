import { Component, OnInit } from '@angular/core';
import {Practice} from "../plan/practice";
import {ActivatedRoute, Router} from "@angular/router";
import {Plan} from "../plan/plan";
import {PlanService} from "../plan/plan.service";
import {handleError} from "../helpers";
import {KeycloakService} from "keycloak-angular";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-show-plan',
  templateUrl: './show-plan.component.html',
  styleUrls: ['./show-plan.component.css']
})
export class ShowPlanComponent implements OnInit {

  userName = ""

  isFavorite = false
  plan: Plan

  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private planService: PlanService,
    private router: Router,
    protected keycloakAngular: KeycloakService
  ) { }

  ngOnInit() {
    this.plan = new Plan("","","",[])
    let userProfilePromise = this.keycloakAngular.loadUserProfile();
    userProfilePromise.then(profile => this.userName = profile.username)
    userProfilePromise.then(profile => {
      this.route.paramMap.subscribe(params => {
        var modelId = params.get('planId') || null
        if (modelId !== null) {
          this.initPlan(modelId)
          this.initFavorite(modelId, profile.username)
        }
      });
    })
  }

  copyToClipboard() {
    document.addEventListener('copy', (clipEvent: ClipboardEvent) => {
      clipEvent.clipboardData.setData('text/plain', window.location.href);
      clipEvent.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
    this.snackBar.open("Link in Zwischenablage kopiert...","", {
      duration: 2000
    });
  }

  isOwnPlan() {
    return this.plan.createdBy === this.userName
  }

  favoriteChanged() {
    if(this.isFavorite) {
      this.removeFavorite(this.userName, this.plan.id)
    }
    else {
      this.addFavorite(this.userName, this.plan.id)
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
