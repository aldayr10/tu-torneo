import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCreatedTournament } from './view-created-tournament';

describe('ViewCreatedTournament', () => {
  let component: ViewCreatedTournament;
  let fixture: ComponentFixture<ViewCreatedTournament>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCreatedTournament],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewCreatedTournament);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
