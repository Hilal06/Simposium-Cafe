import { Component, OnInit, ViewChild } from '@angular/core';
import { KasirService } from './../../service/kasir.service';
import { Kasir } from './../../model/Kasir';
import { MatTableDataSource } from '@angular/material';
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
  columsDisplay: string[] = ['nama', 'username','password'];
  dataSource = new MatTableDataSource<Kasir>();
  
  @ViewChild(MatSort) sort: MatSort;

  kasirForm = new FormGroup({
    nama: new FormControl(''),
    username:new FormControl(''),
    password: new FormControl('')
  });
  constructor(private KasirService: KasirService, private EncrDecr: CryptoService) { }

  ngOnInit() {    
    this.KasirService.getKasir().subscribe(res => {
    this.tmp = res.map( item => {
      return {
        id: item.payload.doc.id,
        ...item.payload.doc.data()
      } as Kasir;
    });
    this.kasirr = this.tmp;
    this.dataSource = new MatTableDataSource<Kasir>(this.kasirr);
    this.dataSource.sort = this.sort;
  });
  
  }
  saveKasir() {
    const nama = this.kasirForm.get('nama').value;
    const username = this.kasirForm.get('username').value;
    const password = this.kasirForm.get('password').value;
    let iniKasir: Kasir = {'id': 1, 'nama': nama, 'username': username, 'password': password};
    this.KasirService.addKasir(iniKasir);
    this.dataSource = new MatTableDataSource<Kasir>(this.kasirr);
    this.dataSource.sort = this.sort;
  }
}
