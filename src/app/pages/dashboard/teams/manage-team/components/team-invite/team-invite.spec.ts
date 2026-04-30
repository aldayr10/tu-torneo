import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamInvite } from './team-invite';

describe('TeamInvite', () => {
  let component: TeamInvite;
  let fixture: ComponentFixture<TeamInvite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamInvite],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamInvite);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
