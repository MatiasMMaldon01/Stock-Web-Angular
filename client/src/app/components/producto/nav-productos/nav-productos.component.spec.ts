import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavProductosComponent } from './nav-productos.component';

describe('NavProductosComponent', () => {
  let component: NavProductosComponent;
  let fixture: ComponentFixture<NavProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
