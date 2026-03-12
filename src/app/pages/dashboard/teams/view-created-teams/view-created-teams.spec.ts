import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCreatedTeams } from './view-created-teams';

describe('ViewCreatedTeams', () => {
  let component: ViewCreatedTeams;
  let fixture: ComponentFixture<ViewCreatedTeams>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCreatedTeams],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewCreatedTeams);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
