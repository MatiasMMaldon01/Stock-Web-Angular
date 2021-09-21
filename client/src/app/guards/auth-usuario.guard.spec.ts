import { TestBed } from '@angular/core/testing';

import { AuthUsuarioGuard } from './auth-usuario.guard';

describe('AuthUsuarioGuard', () => {
  let guard: AuthUsuarioGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthUsuarioGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
