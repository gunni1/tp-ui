import {Component, Input, OnInit} from '@angular/core';
import {Plan} from "../plan/plan";

@Component({
  selector: 'plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.css']
})
export class PlanListComponent implements OnInit {

  @Input()
  plans: Plan[] = []

  constructor() { }

  ngOnInit() {
  }

}
