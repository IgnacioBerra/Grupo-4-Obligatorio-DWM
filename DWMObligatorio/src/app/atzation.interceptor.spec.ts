import { TestBed } from '@angular/core/testing';

import { AtzationInterceptor } from './atzation.interceptor';

describe('AtzationInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AtzationInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AtzationInterceptor = TestBed.inject(AtzationInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
