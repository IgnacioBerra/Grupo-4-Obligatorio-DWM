import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarActivitiesComponent } from './editar-activities.component';

describe('EditarActivitiesComponent', () => {
  let component: EditarActivitiesComponent;
  let fixture: ComponentFixture<EditarActivitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarActivitiesComponent]
    });
    fixture = TestBed.createComponent(EditarActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
