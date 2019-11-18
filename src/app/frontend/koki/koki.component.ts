import { Kasir } from './../../model/Kasir';
import { Component, OnInit, ViewChild} from '@angular/core';
import { Transaksi } from './../../model/Transaksi';
import { MatTableDataSource, MatPaginator, MatBottomSheet} from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { TransaksiService } from 'src/app/sevice/transaksi.service';
import { DetailMenuBottomSheetComponent } from 'src/app/dialog/detail-menu-bottom-sheet/detail-menu-bottom-sheet.component';
import { Timestamp } from 'rxjs';
import { Menu } from 'src/app/model/menu';
@Component({
  selector: 'app-koki',
  templateUrl: './koki.component.html',
  styleUrls: ['./koki.component.css']
})
export class KokiComponent implements OnInit {
  tmp: Transaksi[];
  listTransaksi = new Array<Transaksi>();
  columsDisplay: string[] = ['id', 'menu', 'tanggal'];
  dataSource = new MatTableDataSource<Transaksi>();

  constructor(private transaksiService: TransaksiService) { }

  ngOnInit() {this.transaksiService.getTransaksi().subscribe(res => {
    this.tmp = res.map( item => {
      return {
        'id': item.payload.doc.id,
        ...item.payload.doc.data()
      } as Transaksi;
    });
    this.listTransaksi = this.tmp;
    this.dataSource = new MatTableDataSource<Transaksi>(this.listTransaksi);
  });
  }
  getDateOnly(time: firebase.firestore.Timestamp) {
    const date = time.toDate();
    const stringDate = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
    return stringDate;
  }
  search(event: string) {
    this.dataSource.filter = event.trim().toLowerCase();
  }
  getmenu(menu: Menu) {
    return menu.Nama;
  }
}
