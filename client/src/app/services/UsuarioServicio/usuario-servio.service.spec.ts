import { TestBed } from '@angular/core/testing';

import { UsuarioServioService } from './usuario-servio.service';

describe('UsuarioServioService', () => {
  let service: UsuarioServioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioServioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
