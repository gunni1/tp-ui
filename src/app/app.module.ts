import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NewPlanFormComponent } from './new-plan-form/new-plan-form.component';
import { ShowPlanComponent } from './show-plan/show-plan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyPlansComponent } from './my-plans/my-plans.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material";


const routes: Routes = [
  { path: 'new-plan', component: NewPlanFormComponent },
  { path: 'show-plan', component: ShowPlanComponent },
  { path: '', pathMatch: 'full', redirectTo: '/new-plan' },
  { path: '**', redirectTo: '/new-plan' }
];

@NgModule({
  declarations: [
    AppComponent,
    NewPlanFormComponent,
    ShowPlanComponent,
    MyPlansComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,ReactiveFormsModule,
    RouterModule.forRoot(routes, { enableTracing: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
