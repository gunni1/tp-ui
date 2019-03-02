import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Plan} from "./plan";
import {Practice} from "./practice";
import {environment} from "../../environments/environment";
import {handleError} from "../helpers";

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
    const path = environment.planBackendPath + `/userplans/${userId}`
    return this.http.get<Plan[]>(path, this.httpOptionsJsonResult)
  }

  addFavorite(userId: string, planId: string): Observable<string[]> {
    const path = environment.planBackendPath + `/userfav/${userId}/plan`
    let addFavoriteJson = {planId: planId};
    return this.http.post<string[]>(path,addFavoriteJson, this.httpOptionsJsonResult)
  }

  removeFavorite(userId: string, planId: string): Observable<string[]> {
    const path = environment.planBackendPath + `/userfav/${userId}/plan/${planId}`
    return this.http.delete<string[]>(path, this.httpOptionsJsonResult)
  }

  getUserFavoritePlanIds(userId: string): Observable<string[]> {
    const path = environment.planBackendPath + `/userfav/${userId}`
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
      params: {"onlyIds": "true"}
    };
    return this.http.get<string[]>(path, httpOptions)
  }

  getUserFavoritePlans(userId: string): Observable<Plan[]> {
    const path = environment.planBackendPath + `/userfav/${userId}`
    return this.http.get<Plan[]>(path, this.httpOptionsJsonResult)
  }


}
