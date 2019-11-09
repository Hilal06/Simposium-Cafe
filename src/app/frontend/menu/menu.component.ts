import { TransaksiService } from 'src/app/sevice/transaksi.service';
import { Transaksi } from './../../model/Transaksi';
import{ MenuService } from "./../../service/menu.service";
import{ Menu } from "./../../model/menu"
import { Component, OnInit } from '@angular/core';
import { Kasir } from 'src/app/model/Kasir';

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

  constructor(private menuService: MenuService, private transaksiService: TransaksiService) { }

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
  hapusItem(i) {
    const index = this.items.indexOf(i);
    this.items.splice(index, 1);
  }
  getTotalCost() {
    return this.items.map(t => +t.harga).reduce((acc, value) => acc + value, 0);
  }
  pesan() {
    // nama pelanggan set with session name pelanggan from login pelanggan
    const pelanggan = 'Name Here';
    const menuOrder = this.items;
    const kasir: Kasir = {'id': 123, 'nama': 'Test Name', 'username': 'Test', 'password': 'test'};
    if (menuOrder.length === 0) {
      console.log('data empty');
    } else {
      // tslint:disable-next-line: max-line-length
      const transaksi: Transaksi = {'id': '1', 'pelanggan': pelanggan ,'menu': menuOrder, 'kasir': kasir, 'tanggal':null, 'total': this.getTotalCost()};
      this.transaksiService.addTransaksi(transaksi);
    }
  }
}
