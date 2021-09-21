import { TestBed } from '@angular/core/testing';

import { ValidacionTokenInterceptor } from './validacion-token.interceptor';

describe('ValidacionTokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ValidacionTokenInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ValidacionTokenInterceptor = TestBed.inject(ValidacionTokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
