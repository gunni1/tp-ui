import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanNavTableComponent } from './plan-nav-table.component';

describe('PlanNavTableComponent', () => {
  let component: PlanNavTableComponent;
  let fixture: ComponentFixture<PlanNavTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanNavTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanNavTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
