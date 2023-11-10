import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameUserComponent } from './game-user.component';

describe('GameUserComponent', () => {
  let component: GameUserComponent;
  let fixture: ComponentFixture<GameUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameUserComponent]
    });
    fixture = TestBed.createComponent(GameUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
