import { MenuService } from './../../service/menu.service';
import { Menu } from './../../model/menu';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { CryptoService } from "./../../service/crypto.service";
@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {
  tmp: Menu[];
  menus = new Array<Menu>();
  columsDisplay: string[] = ['Nama', 'harga'];
  dataSource = new MatTableDataSource<Menu>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  MenuForm = new FormGroup({
    name: new FormControl(''),
    harga: new FormControl(''),
  });

  constructor(private menuService: MenuService, private EncrDecr: CryptoService) { }

  ngOnInit() {
    
    this.menuService.getMenus().subscribe(res => {
      this.tmp = res.map( item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Menu;
      });
      this.menus = this.tmp;
      this.dataSource = new MatTableDataSource<Menu>(this.menus);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    
    // this.menus.push({'id':0, 'Nama': 'Rifaul', 'harga': 1000});
    
  }
  saveMenu() {
    const Nama = this.MenuForm.get('name').value;
    const harga = this.MenuForm.get('harga').value;
    let menu: Menu = {'id': 1, 'Nama': Nama, 'harga':harga};
    this.menuService.addMenu(menu);
    this.dataSource = new MatTableDataSource<Menu>(this.menus);
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
