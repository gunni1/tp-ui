import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PlanFormComponent } from './plan-form/plan-form.component';
import { ShowPlanComponent } from './show-plan/show-plan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyPlansComponent } from './my-plans/my-plans.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatCardModule, MatCheckboxModule, MatInputModule, MatListModule} from "@angular/material";
import {HttpClientModule} from "@angular/common/http";
import { PlanListComponent } from './plan-list/plan-list.component';
import { FavoritePlansComponent } from './favorite-plans/favorite-plans.component';


const routes: Routes = [
  { path: 'edit-plan/:planId', component: PlanFormComponent },
  { path: 'new-plan', component: PlanFormComponent },
  { path: 'my-plans', component: MyPlansComponent },
  { path: 'fav-plans', component: FavoritePlansComponent},
  { path: 'plan/:planId', component: ShowPlanComponent },
  { path: '', pathMatch: 'full', redirectTo: '/my-plans' },
  { path: '**', redirectTo: '/my-plans' }
];

@NgModule({
  declarations: [
    AppComponent,
    PlanFormComponent,
    ShowPlanComponent,
    MyPlansComponent,
    PlanListComponent,
    FavoritePlansComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,MatCardModule,MatListModule,MatCheckboxModule,
    FormsModule,ReactiveFormsModule,
    RouterModule.forRoot(routes, { enableTracing: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
