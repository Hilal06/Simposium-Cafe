import { Component, OnInit, ViewChild } from '@angular/core';
import { KasirService } from './../../service/kasir.service';
import { Kasir } from './../../model/Kasir';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormControl } from '@angular/forms';
import { CryptoService } from "./../../service/crypto.service";
@Component({
  selector: 'app-admin-kasir',
  templateUrl: './admin-kasir.component.html',
  styleUrls: ['./admin-kasir.component.css']
})
export class AdminKasirComponent implements OnInit {
  tmp: Kasir[];
  kasirr = new Array<Kasir>();
  columsDisplay: string[] = ['nama', 'username', 'password', 'action'];
  dataSource = new MatTableDataSource<Kasir>();
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  kasirForm = new FormGroup({
    nama: new FormControl(''),
    username:new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private KasirService: KasirService, private EncrDecr: CryptoService) { }

  ngOnInit() {
    this.KasirService.getKasir().subscribe(res => {
    this.tmp = res.map( item => {
      return {
        'id': item.payload.doc.id,
        ...item.payload.doc.data()
      } as Kasir;
    });
    this.kasirr = this.tmp;
    this.dataSource = new MatTableDataSource<Kasir>(this.kasirr);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  });
  }
  saveKasir() {
    const nama = this.kasirForm.get('nama').value;
    const username = this.kasirForm.get('username').value;
    const password = this.EncrDecr.set(username, this.kasirForm.get('password').value);
    let iniKasir: Kasir = {'id': null, 'nama': nama, 'username': username, 'password': password};
    this.KasirService.addKasir(iniKasir);
    this.dataSource = new MatTableDataSource<Kasir>(this.kasirr);
    this.dataSource.sort = this.sort;
  }
  hapusKasir(Kasir: Kasir) {
    this.KasirService.dropKasir(Kasir);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
}
