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

  getPlan(planId: String): Observable<Plan> {
    const path = environment.planBackendPath + `/plan/${planId}`
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.get<Plan>(path, httpOptions);
  }

  updatePlan(plan: Plan, planId: String): Observable<Plan> {
    const path = environment.planBackendPath + `/plan/${planId}`
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.put<Plan>(path, plan, httpOptions)
  }

  savePlan(plan: Plan): Observable<Plan> {
    const path = environment.planBackendPath + `/plan`
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<Plan>(path, plan, httpOptions)
  }
}
