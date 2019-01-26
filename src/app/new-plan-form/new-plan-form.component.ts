import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Practice} from "../practice";

@Component({
  selector: 'app-new-plan-form',
  templateUrl: './new-plan-form.component.html',
  styleUrls: ['./new-plan-form.component.css']
})
export class NewPlanFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm()
  }

  private initForm() {
    this.form = this.formBuilder.group({
      title: this.formBuilder.control(''),
      practices: this.formBuilder.array([
        this.formBuilder.group({
          name: this.formBuilder.control(''),
          reps: this.formBuilder.control('')
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
        reps: this.formBuilder.control('')
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
