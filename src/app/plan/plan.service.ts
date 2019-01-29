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
    const url = environment.planBackendUrl + `/plan/${planId}`
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.get<Plan>(url, httpOptions);
  }
}
