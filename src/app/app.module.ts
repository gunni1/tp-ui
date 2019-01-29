import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PlanFormComponent } from './plan-form/plan-form.component';
import { ShowPlanComponent } from './show-plan/show-plan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyPlansComponent } from './my-plans/my-plans.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatCardModule, MatInputModule} from "@angular/material";
import {HttpClientModule} from "@angular/common/http";


const routes: Routes = [
  { path: 'new-plan/:planId', component: PlanFormComponent },
  { path: 'new-plan', component: PlanFormComponent },
  { path: 'my-plans', component: MyPlansComponent },
  { path: 'show-plan', component: ShowPlanComponent },
  { path: '', pathMatch: 'full', redirectTo: '/my-plans' },
  { path: '**', redirectTo: '/my-plans' }
];

@NgModule({
  declarations: [
    AppComponent,
    PlanFormComponent,
    ShowPlanComponent,
    MyPlansComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,MatCardModule,
    FormsModule,ReactiveFormsModule,
    RouterModule.forRoot(routes, { enableTracing: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
