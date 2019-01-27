import { Component, OnInit } from '@angular/core';
import {Practice} from "../plan/practice";

@Component({
  selector: 'app-show-plan',
  templateUrl: './show-plan.component.html',
  styleUrls: ['./show-plan.component.css']
})
export class ShowPlanComponent implements OnInit {

  constructor() { }

  practices: Practice[] = [];

  ngOnInit() {
  }

}
