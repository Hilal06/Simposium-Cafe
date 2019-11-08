import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMenuBottomSheetComponent } from './detail-menu-bottom-sheet.component';

describe('DetailMenuBottomSheetComponent', () => {
  let component: DetailMenuBottomSheetComponent;
  let fixture: ComponentFixture<DetailMenuBottomSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailMenuBottomSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMenuBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
