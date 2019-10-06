import { create } from 'domain';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { reject } from 'bluebird';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private firestore: AngularFirestore) { }
  createMenu(data) {
    return new Promise<any> ((resolve, reject) => {
      this.firestore.collection("Menu")
      .add(data)
      .then(res => {}, err => reject(err));
    });
  }

  getMenu() {
    return this.firestore.collection("Menu").snapshotChanges();
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
