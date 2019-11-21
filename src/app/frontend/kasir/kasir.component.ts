import { Kasir } from './../../model/Kasir';
import { Component, OnInit, ViewChild} from '@angular/core';
import { Transaksi } from './../../model/Transaksi';
import { MatTableDataSource, MatPaginator, MatBottomSheet} from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { TransaksiService } from 'src/app/sevice/transaksi.service';
import { DetailMenuBottomSheetComponent } from 'src/app/dialog/detail-menu-bottom-sheet/detail-menu-bottom-sheet.component';

@Component({
  selector: 'app-kasir',
  templateUrl: './kasir.component.html',
  styleUrls: ['./kasir.component.css']
})
export class KasirComponent implements OnInit {
  tmp: Transaksi[];
  listTransaksi = new Array<Transaksi>();
  columsDisplay: string[] = ['id', 'pelanggan', 'kasir', 'tanggal', 'total', 'detail'];
  dataSource = new MatTableDataSource<Transaksi>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private transaksiService: TransaksiService, private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.transaksiService.getTransaksi().subscribe(res => {
      this.tmp = res.map( item => {
        return {
          'id': item.payload.doc.id,
          ...item.payload.doc.data()
        } as Transaksi;
      });
      this.listTransaksi = this.tmp;
      this.dataSource = new MatTableDataSource<Transaksi>(this.listTransaksi);
      this.dataSource.sort = this.sort;
    });
  }

  showDetailMenu(menus, total) {
    this.bottomSheet.open(DetailMenuBottomSheetComponent, {
      data: {menus, total}
    });
  }

  getKasirName(kasir: Kasir) {
    return kasir.nama;
  }

  getDateOnly(time: firebase.firestore.Timestamp) {
    const date = time.toDate();
    const stringDate = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
    return stringDate;
  }

  search(event: string) {
    this.dataSource.filter = event.trim().toLowerCase();
  }
  destroySession(key) {
    sessionStorage.removeItem(key);
  }
}
