
import{ MenuService } from "./../../service/menu.service";
import{ Menu } from "./../../model/menu"
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Console } from '@angular/core/src/console';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menus: Menu[];
  qty = 0;
  menu: any;
  items = new Array();

  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.menuService.getMenus().subscribe( res => {
      this.menus = res.map( item => {
        return {
          'id': item.payload.doc.id,
          ...item.payload.doc.data()
        } as Menu;
      });
    });
  }

  tambahCart(menu) {
    this.items.push(menu);
  }
  hapusItem(i) {;
    var index = this.items.indexOf(i);
    this.items.splice(index, 1);
  }
  getTotalCost() {
    return this.items.map(t => +t.harga).reduce((acc, value) => acc + value, 0);
  }
  pesan() {
    const menuOrder = this.items;
    console.log(menuOrder);
  }
}