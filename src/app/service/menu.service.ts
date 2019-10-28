import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';


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
    this.firestore.collection('Menu').add(menu);
  }

  deleteMenu(menu) {
    this.firestore.collection('Menu').doc(menu.key).delete();
  }
}
