import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerJoinTeam } from './player-join-team';

describe('PlayerJoinTeam', () => {
  let component: PlayerJoinTeam;
  let fixture: ComponentFixture<PlayerJoinTeam>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerJoinTeam],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerJoinTeam);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
