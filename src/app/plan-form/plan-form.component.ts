import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Practice} from "../plan/practice";
import {PlanService} from "../plan/plan.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {handleError} from "../helpers";

@Component({
  selector: 'app-new-plan-form',
  templateUrl: './plan-form.component.html',
  styleUrls: ['./plan-form.component.css']
})
export class PlanFormComponent implements OnInit {

  form: FormGroup;


  modelId: string

  constructor(
    private formBuilder: FormBuilder,
    private planService: PlanService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.initEmptyForm()
    this.route.paramMap.subscribe(params => {
      this.modelId = params.get('planId') || null
      if (this.modelId !== null) {
        this.initWithPlanId(this.modelId)
      }
    });


  }

  private initWithPlanId(planId: string) {
    this.planService.getPlan(planId).subscribe(
      plan => {
        this.form = this.formBuilder.group({
          title: this.formBuilder.control(plan.title),
          practices: this.asFormArray(plan.practices)
        })
      },
      err => {
        handleError(err);
        this.initEmptyForm()
      }
    )
  }

  private asFormArray(practices: Practice[]):FormArray {
    let result = this.formBuilder.array([])
    for(let practice of practices){
      result.push(this.formBuilder.group({
        name: this.formBuilder.control(practice.name),
        quantity: this.formBuilder.control(practice.quantity)
      }))
    }
    return result
  }

  private initEmptyForm() {
    this.form = this.formBuilder.group({
      title: this.formBuilder.control(''),
      practices: this.formBuilder.array([
        this.formBuilder.group({
          name: this.formBuilder.control(''),
          quantity: this.formBuilder.control('')
        })
      ])
    });
  }

  private onSubmit() {

  }


  private addPracticeControls() {
    let control = this.form.get('practices') as FormArray
    //let control = <FormArray>this.form.controls.practices;
    control.push(
      this.formBuilder.group({
        name: this.formBuilder.control(''),
        quantity: this.formBuilder.control('')
      })
    )
  }

  private removePracticeControls(index: number) {
    let control = this.form.get('practices') as FormArray
    control.removeAt(index);
  }

  private getPractices() {
    return this.form.get('practices') as FormArray
  }
}
