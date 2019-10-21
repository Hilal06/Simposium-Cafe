import { MenuService } from './../../service/menu.service';
import { Menu } from './../../model/menu';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  tmp: Menu[];
  menus = new Array<Menu>();
  columsDisplay: string[] = ['Nama', 'harga'];
  dataSource = new MatTableDataSource<Menu>();

  @ViewChild(MatSort) sort: MatSort;

  MenuForm = new FormGroup({
    name: new FormControl(''),
    harga: new FormControl(''),
  });

  constructor(private menuService: MenuService) { }

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
    });
    
    // this.menus.push({'id':0, 'Nama': 'Rifaul', 'harga': 1000});
    this.dataSource = new MatTableDataSource<Menu>(this.menus);
    this.dataSource.sort = this.sort;
  }
  saveMenu() {
    const Nama = this.MenuForm.get('name').value;
    const harga = this.MenuForm.get('harga').value;
    let menu: Menu = {'id': 1, 'Nama': Nama, 'harga':harga};
    this.menuService.addMenu(menu);
    this.dataSource = new MatTableDataSource<Menu>(this.menus);
    this.dataSource.sort = this.sort;
  }
}
