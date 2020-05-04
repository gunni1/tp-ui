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
  MatListModule,MatExpansionModule,
  MatSnackBarModule, MatTableModule
} from "@angular/material";
import {HttpClientModule} from "@angular/common/http";
import { PlanListComponent } from './plan-list/plan-list.component';
import { FavoritePlansComponent } from './favorite-plans/favorite-plans.component';
import {NgbModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BackButtonComponent} from "./BackButton";
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PlanNavTableComponent } from './plan-nav-table/plan-nav-table.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {AuthGuard} from "./auth/auth.guard";
/**
 * Amplify
 */
import { AmplifyAngularModule, AmplifyService, AmplifyModules } from 'aws-amplify-angular';
import Auth from '@aws-amplify/auth';
import Interactions from '@aws-amplify/interactions';
import Storage from '@aws-amplify/storage';



const routes: Routes = [
  { path: 'home', component: LandingPageComponent},
  { path: 'user-home', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'edit-plan/:planId', component: PlanFormComponent, canActivate: [AuthGuard]},
  { path: 'new-plan', component: PlanFormComponent, canActivate: [AuthGuard]},
  { path: 'my-plans', component: MyPlansComponent, canActivate: [AuthGuard]},
  { path: 'fav-plans', component: FavoritePlansComponent, canActivate: [AuthGuard]},
  { path: 'plan/:planId', component: ShowPlanComponent},
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
    LandingPageComponent,
    PlanNavTableComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,BrowserAnimationsModule,
    NgbModule,
    MatInputModule,MatCardModule,MatListModule,MatCheckboxModule,MatSnackBarModule,MatBottomSheetModule,MatTableModule,
    FormsModule,ReactiveFormsModule,MatExpansionModule,DragDropModule,
    AmplifyAngularModule,
    RouterModule.forRoot(routes, { enableTracing: false })
  ],
  entryComponents: [ShowPlanBottomSheet],
  providers: [{
    provide: AmplifyService,
    useFactory:  () => {
      return AmplifyModules({
        Auth,
        Storage,
        Interactions
      });
    }
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
