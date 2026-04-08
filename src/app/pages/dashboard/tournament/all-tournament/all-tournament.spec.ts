import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTournament } from './all-tournament';

describe('AllTournament', () => {
  let component: AllTournament;
  let fixture: ComponentFixture<AllTournament>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllTournament],
    }).compileComponents();

    fixture = TestBed.createComponent(AllTournament);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
