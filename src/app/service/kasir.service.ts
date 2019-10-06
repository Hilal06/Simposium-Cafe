import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { create } from 'domain';
import { resolve, reject } from 'bluebird';

@Injectable({
  providedIn: 'root'
})
export class KasirService {

  constructor(private firestore : AngularFirestore) { }
  createKasir(data){
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection("Kasir")
      .add(data)
      .then(res => {}, err => reject(err));
    });
  }
  getKasir() {
    return this.firestore.collection("Kasir").snapshotChanges();
  }
  updateKasir(data) {
    return this.firestore.collection("Kasir")
    .doc(data.payload.doc.id)
    .set({ completed: true }, { merge: true});
  }
  deleteKasir(data) {
    return this.firestore.collection("Kasir")
    .doc(data.payload.doc.id).delete();
  }

}
