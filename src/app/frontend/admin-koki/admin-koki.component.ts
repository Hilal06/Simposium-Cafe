import { Component, OnInit } from '@angular/core';
import { KokiService } from "./../../service/koki.service";
import { FormGroup, FormControl } from "@angular/forms";
import { Koki } from './../../model/koki';
import { MatTableDataSource } from '@angular/material';

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

  kokiForm = new FormGroup({
    nama      : new FormControl(''),
    username  : new FormControl(''),
    password  : new FormControl('')
  });

  constructor(private KokiService: KokiService) { }

  ngOnInit() {
    this.KokiService.getKoki().subscribe(res => {
      this.tmp = res.map(item => {
        return {
          id  : item.payload.doc.id, ...item.payload.doc.data()
        } as Koki;
      });
      this.KokiArray  = this.tmp;
      this.dataSource = new MatTableDataSource<Koki>(this.KokiArray);
      
    });
  }

  saveKoki() {
    const nama      = this.kokiForm.get('nama').value;
    const username  = this.kokiForm.get('username').value;
    const password  = this.kokiForm.get('password').value;
    let iniKoki     : Koki = {'id' : 1, 'nama' : nama, 'username' : username, 'password' : password};
    this.KokiService.addKoki(iniKoki);
    this.dataSource = new MatTableDataSource<Koki>(this.KokiArray);
  }
}
