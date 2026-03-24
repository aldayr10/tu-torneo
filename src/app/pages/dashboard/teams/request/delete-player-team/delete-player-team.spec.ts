import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePlayerTeam } from './delete-player-team';

describe('DeletePlayerTeam', () => {
  let component: DeletePlayerTeam;
  let fixture: ComponentFixture<DeletePlayerTeam>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletePlayerTeam],
    }).compileComponents();

    fixture = TestBed.createComponent(DeletePlayerTeam);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
