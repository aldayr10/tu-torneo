import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionTournament } from './description-tournament';

describe('DescriptionTournament', () => {
  let component: DescriptionTournament;
  let fixture: ComponentFixture<DescriptionTournament>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescriptionTournament],
    }).compileComponents();

    fixture = TestBed.createComponent(DescriptionTournament);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
