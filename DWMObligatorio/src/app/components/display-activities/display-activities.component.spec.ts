import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayActivitiesComponent } from './display-activities.component';

describe('DisplayActivitiesComponent', () => {
  let component: DisplayActivitiesComponent;
  let fixture: ComponentFixture<DisplayActivitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayActivitiesComponent]
    });
    fixture = TestBed.createComponent(DisplayActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
