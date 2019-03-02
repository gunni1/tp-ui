import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritePlansComponent } from './favorite-plans.component';

describe('FavoritePlansComponent', () => {
  let component: FavoritePlansComponent;
  let fixture: ComponentFixture<FavoritePlansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritePlansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritePlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
