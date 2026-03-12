import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTeam } from './delete-team';

describe('DeleteTeam', () => {
  let component: DeleteTeam;
  let fixture: ComponentFixture<DeleteTeam>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteTeam],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteTeam);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
