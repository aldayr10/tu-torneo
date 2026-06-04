import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTournament } from './delete-tournament';

describe('DeleteTournament', () => {
  let component: DeleteTournament;
  let fixture: ComponentFixture<DeleteTournament>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteTournament],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteTournament);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
