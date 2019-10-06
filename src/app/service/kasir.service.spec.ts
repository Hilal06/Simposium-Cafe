import { TestBed } from '@angular/core/testing';

import { KasirService } from './kasir.service';

describe('KasirService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KasirService = TestBed.get(KasirService);
    expect(service).toBeTruthy();
  });
});
