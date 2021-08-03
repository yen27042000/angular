import { TestBed } from '@angular/core/testing';

import { CodvidService } from './codvid.service';

describe('CodvidService', () => {
  let service: CodvidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodvidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
