
import{ MenuService } from "./../../service/menu.service";
import{ Menu } from "./../../model/menu"
import { Component, OnInit } from '@angular/core';
import { splitClasses } from '@angular/compiler';
import * as firebase from 'firebase';

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
  listGambar = new Array();

  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.menuService.getMenus().subscribe( res => {
      this.menus = res.map( item => {
        return {
          'id': item.payload.doc.id,
          ...item.payload.doc.data()
        } as Menu;
      });
      this.setGambar();
    });
  }

  tambahCart(menu) {
    this.items.push(menu);
  }
  hapusItem(i) {
    var index = this.items.indexOf(i);
    this.items.splice(index, 1);
  }
  getTotalCost() {
    return this.items.map(t => +t.harga).reduce((acc, value) => acc + value, 0);
  }
  async getImage(image: firebase.storage.UploadTaskSnapshot) {
    return await image.ref.getDownloadURL();
  }
  setGambar() {
    const img = firebase.storage();
    this.menus.forEach(async menu => {
      let tmp = menu.image;
      menu.image = img.refFromURL(tmp).root;
    });
  }
}