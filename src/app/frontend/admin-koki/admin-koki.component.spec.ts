import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKokiComponent } from './admin-koki.component';

describe('AdminKokiComponent', () => {
  let component: AdminKokiComponent;
  let fixture: ComponentFixture<AdminKokiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminKokiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminKokiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
