import { TestBed } from '@angular/core/testing';

import { ProvinciaServicioService } from './provincia-servicio.service';

describe('ProvinciaServicioService', () => {
  let service: ProvinciaServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProvinciaServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
