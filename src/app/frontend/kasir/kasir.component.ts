import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Transaksi } from './../../model/Transaksi';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { TransaksiService } from 'src/app/sevice/transaksi.service';
import { Kasir } from 'src/app/model/Kasir';

@Component({
  selector: 'app-kasir',
  templateUrl: './kasir.component.html',
  styleUrls: ['./kasir.component.css']
})
export class KasirComponent implements OnInit {
  tmp: Transaksi[];
  transaksii = new Array<Transaksi>();
  columsDisplay: string[] = [];
  dataSource = new MatTableDataSource<Transaksi>();

  constructor(private TransaksiService: TransaksiService) { }
   
  ngOnInit() {this.TransaksiService.getTransaksi().subscribe(res => {
      this.tmp = res.map( item => {
        return {
          'id': item.payload.doc.id,
          ...item.payload.doc.data()
        } as Transaksi;
      });
      console.log(this.tmp);
      this.transaksii = this.tmp;
      this.dataSource = new MatTableDataSource<Transaksi>(this.transaksii);

    });
  }
}
