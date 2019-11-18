import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KokiComponent } from './koki.component';

describe('KokiComponent', () => {
  let component: KokiComponent;
  let fixture: ComponentFixture<KokiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KokiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KokiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
