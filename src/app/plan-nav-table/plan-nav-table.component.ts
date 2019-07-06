import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material";
import {Plan} from "../plan/plan";
import {PlanService} from "../plan/plan.service";
import {Observable} from "rxjs";
import {DataSource} from "@angular/cdk/table";

@Component({
  selector: 'plan-nav-table',
  templateUrl: './plan-nav-table.component.html',
  styleUrls: ['./plan-nav-table.component.css']
})
export class PlanNavTableComponent {

  @Input()
  userName: string
  @Input()
  set plans(plans: Plan[]) {
    this.dataSource = new MatTableDataSource(plans)
  }

  displayedColumns: string[] = ['title', 'createdBy'];





  dataSource = new MatTableDataSource()

  constructor(private planService: PlanService ) { }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  hasItems(): boolean {
    return this.dataSource.data.length > 0
  }

}

