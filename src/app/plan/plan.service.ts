import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Plan} from "./plan";
import {Practice} from "./practice";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private http: HttpClient) { }

  private httpOptionsJsonResult = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getPlan(planId: String): Observable<Plan> {
    const path = environment.planBackendPath + `/plan/${planId}`
    return this.http.get<Plan>(path, this.httpOptionsJsonResult);
  }

  updatePlan(plan: Plan, planId: String): Observable<Plan> {
    const path = environment.planBackendPath + `/plan/${planId}`
    return this.http.put<Plan>(path, plan, this.httpOptionsJsonResult)
  }

  savePlan(plan: Plan): Observable<Plan> {
    const path = environment.planBackendPath + `/plan`
    return this.http.post<Plan>(path, plan, this.httpOptionsJsonResult)
  }

  getUsersPlans(userId: String): Observable<Plan[]> {
    const path = environment.planBackendPath + `userplans/${userId}`
    return this.http.get<Plan[]>(path, this.httpOptionsJsonResult)
  }
}
