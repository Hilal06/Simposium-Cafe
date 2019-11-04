import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Menu } from './../../model/menu';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { MenuService } from 'src/app/service/menu.service';

@Component({
  selector: 'app-kasir',
  templateUrl: './kasir.component.html',
  styleUrls: ['./kasir.component.css']
})
export class KasirComponent implements OnInit {
  tmp: Menu[];
  menus = new Array<Menu>();
  columsDisplay: string[] = ['Nama', 'harga', 'action'];
  dataSource = new MatTableDataSource<Menu>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  MenuForm = new FormGroup({
    name: new FormControl(''),
    harga: new FormControl(''),
  });
  constructor(private menuService: MenuService) { }
   
  ngOnInit() {this.menuService.getMenus().subscribe(res => {
      this.tmp = res.map( item => {
        return {
          'id': item.payload.doc.id,
          ...item.payload.doc.data()
        } as Menu;
      });
      console.log(this.tmp);
      this.menus = this.tmp;
      this.dataSource = new MatTableDataSource<Menu>(this.menus);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
}
