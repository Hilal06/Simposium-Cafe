import { Menu } from './../../model/menu';
import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material';

export interface DataDetail {
  menus: Menu[];
  total: any;
}

@Component({
  selector: 'app-detail-menu-bottom-sheet',
  templateUrl: './detail-menu-bottom-sheet.component.html',
  styleUrls: ['./detail-menu-bottom-sheet.component.css']
})
export class DetailMenuBottomSheetComponent {
  menus;
  total;
  constructor(
    public dialogRef: MatBottomSheetRef<DetailMenuBottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: DataDetail) {
      this.menus = data.menus;
      this.total = data.total;
  }
}
