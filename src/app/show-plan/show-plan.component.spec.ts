import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPlanComponent } from './show-plan.component';

describe('ShowPlanComponent', () => {
  let component: ShowPlanComponent;
  let fixture: ComponentFixture<ShowPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
