import { KokiService } from './../../service/koki.service';
import { Kasir } from './../../model/Kasir';
import { Component, OnInit, ViewChild} from '@angular/core';
import { Transaksi } from './../../model/Transaksi';
import { MatTableDataSource, MatPaginator, MatBottomSheet} from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { TransaksiService } from 'src/app/sevice/transaksi.service';
import { DetailMenuBottomSheetComponent } from 'src/app/dialog/detail-menu-bottom-sheet/detail-menu-bottom-sheet.component';
import { Timestamp } from 'rxjs';
import { Menu } from 'src/app/model/menu';
import { NgComponentOutlet } from '@angular/common';
import { element } from '@angular/core/src/render3';
import { mkdirSync } from 'fs';
@Component({
  selector: 'app-koki',
  templateUrl: './koki.component.html',
  styleUrls: ['./koki.component.css']
})
export class KokiComponent implements OnInit {
  tmp: Transaksi[];
  listTransaksi = new Array<Transaksi>();
  columsDisplay: string[] = ['id', 'menu', 'tanggal', 'status'];
  dataSource = new MatTableDataSource<Transaksi>();

  constructor(private transaksiService: TransaksiService, private kokiService: KokiService) { }

  ngOnInit() {
    this.kokiService.getTodayOrder().then(res => {
      this.tmp = res.docChanges().map(item => {
        return {
          'id': item.doc.id,
          ...item.doc.data()
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
  getmenu(menu: Menu[]) {
    let mk = '';
    menu.forEach(element => {
      if (mk === '') {
        mk = mk + element.Nama;
      } else {
        mk = mk + ', ' + element.Nama;
      }
    });
    return mk;
  }
  orderDone(data) {
    this.kokiService.statusChange(data);
  }

  getStatusMessage(data) {
    if (data) {
      return 'Complete';
    } else {
      return 'Process';
    }
  }
}