import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Menu } from '../model/menu';
import { database } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private firestore: AngularFirestore) {
  }
  getMenus() {
    return this.firestore.collection('Menu').snapshotChanges();
  }

  addMenu(menu) {
    delete menu.id;
    this.firestore.collection('Menu').add(menu);
  }

  deleteMenu(menu: Menu) {
    this.firestore.collection('Menu').doc(menu.id).delete();
  }
}
