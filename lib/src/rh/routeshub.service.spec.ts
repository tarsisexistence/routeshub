import { TestBed } from '@angular/core/testing';

import { RouteshubService } from './routeshub.service';

describe('RouteshubService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RouteshubService = TestBed.get(RouteshubService);
    expect(service).toBeTruthy();
  });
});
