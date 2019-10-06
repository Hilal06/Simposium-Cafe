import { TestBed } from '@angular/core/testing';

import { KokiService } from './koki.service';

describe('KokiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KokiService = TestBed.get(KokiService);
    expect(service).toBeTruthy();
  });
});
