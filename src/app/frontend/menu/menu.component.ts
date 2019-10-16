import { AngularFirestore } from '@angular/fire/firestore';
import{ MenuService } from "./../../service/menu.service";
import{ Menu } from "./../../model/menu"
import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { HttpClientJsonpModule } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { any, resolve } from 'bluebird';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menus: any = [];
  qty = 0;
  menu: any;
  items = new Array();

  constructor(private menuService: MenuService) { }

  ngOnInit() {

    this.menuService.getMenu().subscribe(
      res => {
        this.menus = res;
        console.log(res);
        console.log(this.menus);
      }
    );
  }
  tambahCart(idx){
    const newItem = {
      id:this.menu[idx-1].idMenu,
      nama:this.menu[idx-1].nama,
      harga: this.menu[idx-1].harga,
    };
    this.items.push(newItem);
  }
  getTotalCost(){
    return this.items.map(t => t.harga).reduce((acc, value) => acc + value, 0);
  }

}
