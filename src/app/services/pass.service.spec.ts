import { TestBed } from '@angular/core/testing';

import { passServices } from './pass.service';

describe('passServices', () => {
  let service: passServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(passServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
