
import{ MenuService } from "./../../service/menu.service";
import{ Menu } from "./../../model/menu"
import { Component, OnInit } from '@angular/core';

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
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Menu;
      });
    });
  }

  tambahCart(menu) {
    this.items.push(menu);
  }
  hapusItem(i) {
    console.log(this.items);
    this.items.slice(i, 1);
    console.log(this.items);
  }
  getTotalCost() {
    var total = this.items.map(t => t.harga);
    var jumlah = total.reduce((acc, value) => acc + value, 0);
    return jumlah
  }
}