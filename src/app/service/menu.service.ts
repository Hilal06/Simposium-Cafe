import { Menu } from './../model/menu';
import { create } from 'domain';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { reject, resolve } from 'bluebird';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {


  constructor(private firestore: AngularFirestore) { 
  }
  createMenu(data) {
    return new Promise<any> ((resolve, reject) => {
      this.firestore.collection("Menu")
      .add(data)
      .then(res => {}, err => reject(err));
    });
  }

  getMenu(){
    return this.firestore.collection('Menu').snapshotChanges();
  }
  updateMenu(data) {
    return this.firestore.collection("Menu")
    .doc(data.payload.doc.id)
    .set({completed: true}, {merge: true});
  }

  deleteMenu(data) {
    return this.firestore.collection("Menu")
    .doc(data.payload.doc.id).delete();
  }

}
