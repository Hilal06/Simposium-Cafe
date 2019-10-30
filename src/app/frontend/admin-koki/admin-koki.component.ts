import { Component, OnInit, ViewChild } from '@angular/core';
import { KokiService } from "./../../service/koki.service";
import { FormGroup, FormControl } from "@angular/forms";
import { Koki } from './../../model/koki';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { CryptoService } from 'src/app/service/crypto.service';

@Component({
  selector: 'app-admin-koki',
  templateUrl: './admin-koki.component.html',
  styleUrls: ['./admin-koki.component.css']
})
export class AdminKokiComponent implements OnInit {
  tmp             : Koki[];
  KokiArray       = new Array<Koki>();
  columnsDisplay  : string[] = ['nama', 'username', 'password'];
  dataSource      = new MatTableDataSource<Koki>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  kokiForm = new FormGroup({
    nama      : new FormControl(''),
    username  : new FormControl(''),
    password  : new FormControl('')
  });

  constructor(private KokiService: KokiService, private EncrDecr: CryptoService) { }

  ngOnInit() {
    this.KokiService.getKoki().subscribe(res => {
      this.tmp = res.map(item => {
        return {

          'key'  : item.payload.doc.id, ...item.payload.doc.data()
        } as Koki;
      });
      console.log(this.tmp);
      this.KokiArray  = this.tmp;
      this.dataSource = new MatTableDataSource<Koki>(this.KokiArray);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      
    });
  }

  saveKoki() {
    const nama      = this.kokiForm.get('nama').value;
    const username  = this.kokiForm.get('username').value;
    const password  = this.EncrDecr.set(username, this.kokiForm.get('password').value);
    let iniKoki     : Koki = {'key': null, 'id' : 1, 'nama' : nama, 'username' : username, 'password' : password};
    this.KokiService.addKoki(iniKoki);
    this.dataSource = new MatTableDataSource<Koki>(this.KokiArray);
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
