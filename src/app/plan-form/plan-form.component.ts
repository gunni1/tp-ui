import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Practice} from "../plan/practice";
import {PlanService} from "../plan/plan.service";
import {ActivatedRoute, Router} from "@angular/router";
import {handleError} from "../helpers";
import {Plan} from "../plan/plan";
import {MatSnackBar} from "@angular/material";
import {HttpErrorResponse} from "@angular/common/http";
import {UserService} from "../user.service";
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-new-plan-form',
  templateUrl: './plan-form.component.html',
  styleUrls: ['./plan-form.component.css']
})
export class PlanFormComponent implements OnInit {
  userName = ""
  form = this.getEmptyForm()
  modelId: string
  practices = [ new Practice("","")]

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private planService: PlanService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.userService.getCurrentUserUsername().then(
      user => this.userName = user
    ).catch(
      error => handleError(error)
    );
    this.route.paramMap.subscribe(params => {
      this.modelId = params.get('planId') || null
      if (this.isInEditMode()) {
        this.initWithPlanId(this.modelId)
      }
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.practices, event.previousIndex, event.currentIndex);
  }

  formControlIsReadyWithErrors(formControlId: string): boolean {
    let control = this.form.get(formControlId)
    return control != null && control.touched && control.errors != null
  }

  isInEditMode() {
    return this.modelId !== null
  }

  private initWithPlanId(planId: string) {
    this.planService.getPlan(planId).subscribe(
      plan => {
        this.form = this.formBuilder.group({
          title: this.formBuilder.control(plan.title, Validators.required),
          practices: this.asFormArray(plan.practices)
        })
        this.practices = plan.practices;
      },
      err => {
        if(err.error.error === "NO_PLAN_FOUND") {
          this.router.navigateByUrl("/new-plan")
        }
        handleError(err);

      }
    )
  }

  private asFormArray(practices: Practice[]):FormArray {
    let result = this.formBuilder.array([]);
    for(let practice of practices){
      result.push(this.formBuilder.group({
        name: this.formBuilder.control(practice.name),
        quantity: this.formBuilder.control(practice.quantity)
      }))
    }
    return result
  }

  private getEmptyForm() : FormGroup{
    return this.formBuilder.group({
      title: this.formBuilder.control('',[Validators.required]),
      practices: this.formBuilder.array([
        this.formBuilder.group({
          name: this.formBuilder.control(''),
          quantity: this.formBuilder.control('')
        })
      ])
    });
  }

  onSubmit(saveAsNew: boolean) {
    if(this.form.valid) {
      let plan = new Plan("", this.form.get('title').value, this.userName, this.practices)

      if (this.isInEditMode() && saveAsNew == false) {
        this.planService.updatePlan(plan, this.modelId).subscribe(
          plan => {
            this.showNotification(plan.title + " aktualisiert")
            this.router.navigateByUrl("my-plans")
          },
          error => handleError(error)
        )
      } else {
        this.planService.savePlan(plan).subscribe(
          plan => {
            this.showNotification(plan.title + " gespeichert")
            this.router.navigateByUrl("my-plans")
          },
          error => {
            this.handleFormError(error)

          }
        )
      }
    }
  }

  addPracticeControlAfter(index: number) {
    this.practices.splice(index+1,0, new Practice("",""))
  }

  removePracticeControls(index: number) {
    this.practices.splice(index, 1)
  }

  private showNotification(text: string) {
    this.snackBar.open(text,"", {
      duration: 2000
    });
  }

  private newPracticeControl(): AbstractControl {
    return this.formBuilder.group({
      name: this.formBuilder.control(''),
      quantity: this.formBuilder.control('')
    })
  }

  private handleFormError(error: HttpErrorResponse) {
    let code = error.error.error
    if(code == "TITLE_ALREADY_EXISTS") {
      this.form.get("title").setErrors({'titleAlreadyExists': true})
    }
  }
}

