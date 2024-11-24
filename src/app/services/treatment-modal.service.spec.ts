import { TestBed } from '@angular/core/testing';

import { TreatmentModalService } from './treatment-modal.service';

describe('TreatmentModalService', () => {
  let service: TreatmentModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreatmentModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
