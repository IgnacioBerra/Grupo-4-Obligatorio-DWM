import { TestBed } from '@angular/core/testing';

import { ActivitiyService } from './activitiy.service';

describe('ActivitiyService', () => {
  let service: ActivitiyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivitiyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
