import { Kasir } from './../../model/Kasir';
import { Component, OnInit, ViewChild} from '@angular/core';
import { Transaksi } from './../../model/Transaksi';
import { MatTableDataSource, MatPaginator, MatBottomSheetRef, MatBottomSheet } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { TransaksiService } from 'src/app/sevice/transaksi.service';

@Component({
  selector: 'app-kasir',
  templateUrl: './kasir.component.html',
  styleUrls: ['./kasir.component.css']
})
export class KasirComponent implements OnInit {
  tmp: Transaksi[];
  listTransaksi = new Array<Transaksi>();
  columsDisplay: string[] = ['id', 'kasir', 'tanggal', 'total', 'detail'];
  dataSource = new MatTableDataSource<Transaksi>();

  constructor(private transaksiService: TransaksiService, private _bottomSheet: MatBottomSheet) { }

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

  showDetailMenu(record) {
    console.log(record);
  }

  getKasirName(kasir: Kasir) {
    return kasir.nama;
  }
}
