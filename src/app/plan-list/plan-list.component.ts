import {Component, Input, OnInit} from '@angular/core';
import {Plan} from "../plan/plan";
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.css']
})
export class PlanListComponent implements OnInit {

  @Input()
  plans: Plan[] = []
  @Input()
  userName: string

  constructor() { }

  ngOnInit() {
  }

}
