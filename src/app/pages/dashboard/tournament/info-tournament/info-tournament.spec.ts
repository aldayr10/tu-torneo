import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTournament } from './info-tournament';

describe('InfoTournament', () => {
  let component: InfoTournament;
  let fixture: ComponentFixture<InfoTournament>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoTournament],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoTournament);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
