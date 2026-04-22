import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPlayers } from './team-players';

describe('TeamPlayers', () => {
  let component: TeamPlayers;
  let fixture: ComponentFixture<TeamPlayers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamPlayers],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamPlayers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
