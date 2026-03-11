import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveTeam } from './leave-team';

describe('LeaveTeam', () => {
  let component: LeaveTeam;
  let fixture: ComponentFixture<LeaveTeam>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveTeam],
    }).compileComponents();

    fixture = TestBed.createComponent(LeaveTeam);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
