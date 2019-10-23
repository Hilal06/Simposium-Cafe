import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKasirComponent } from './admin-kasir.component';

describe('AdminKasirComponent', () => {
  let component: AdminKasirComponent;
  let fixture: ComponentFixture<AdminKasirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminKasirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminKasirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
