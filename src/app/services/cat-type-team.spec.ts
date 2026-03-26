import { TestBed } from '@angular/core/testing';

import { CatTypeTeam } from './cat-type-team';

describe('CatTypeTeam', () => {
  let service: CatTypeTeam;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatTypeTeam);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
