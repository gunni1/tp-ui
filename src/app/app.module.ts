import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PlanFormComponent } from './plan-form/plan-form.component';
import {ShowPlanBottomSheet, ShowPlanComponent} from './show-plan/show-plan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyPlansComponent } from './my-plans/my-plans.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  MatBottomSheetModule,
  MatCardModule,
  MatCheckboxModule,
  MatInputModule,
  MatListModule,
  MatSnackBarModule
} from "@angular/material";
import {HttpClientModule} from "@angular/common/http";
import { PlanListComponent } from './plan-list/plan-list.component';
import { FavoritePlansComponent } from './favorite-plans/favorite-plans.component';
import {NgbModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {initializer} from "./app-init";
import {BackButtonComponent} from "./BackButton";
import { LandingPageComponent } from './landing-page/landing-page.component';
import {PlanAuthGuard} from "./PlanAuthGuard";



const routes: Routes = [
  { path: 'home', component: LandingPageComponent},
  { path: 'edit-plan/:planId', component: PlanFormComponent, canActivate: [PlanAuthGuard]},
  { path: 'new-plan', component: PlanFormComponent, canActivate: [PlanAuthGuard]},
  { path: 'my-plans', component: MyPlansComponent, canActivate: [PlanAuthGuard]},
  { path: 'fav-plans', component: FavoritePlansComponent, canActivate: [PlanAuthGuard]},
  { path: 'plan/:planId', component: ShowPlanComponent, canActivate: [PlanAuthGuard]},
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  declarations: [
    AppComponent,
    PlanFormComponent,
    ShowPlanComponent,
    MyPlansComponent,
    PlanListComponent,
    FavoritePlansComponent,
    ShowPlanBottomSheet,
    BackButtonComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,BrowserAnimationsModule,
    KeycloakAngularModule,
    NgbModule,
    MatInputModule,MatCardModule,MatListModule,MatCheckboxModule,MatSnackBarModule,MatBottomSheetModule,
    FormsModule,ReactiveFormsModule,
    RouterModule.forRoot(routes, { enableTracing: true })
  ],
  entryComponents: [ShowPlanBottomSheet],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    },PlanAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
