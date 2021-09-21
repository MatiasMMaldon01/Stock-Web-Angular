import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturasUserComponent } from './facturas-user.component';

describe('FacturasUserComponent', () => {
  let component: FacturasUserComponent;
  let fixture: ComponentFixture<FacturasUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturasUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturasUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
