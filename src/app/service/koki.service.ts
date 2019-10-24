import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { promise } from 'protractor';
import { resolve, reject } from 'bluebird';

@Injectable({
  providedIn: 'root'
})
export class KokiService {

  constructor(private firestore: AngularFirestore) { }

  createKoki(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection("Koki")
      .add(data)
      .then(res => {}, err => reject(err));
    })
  }

  getKoki() {
    return this.firestore.collection("Koki").snapshotChanges();
  }

  updateKoki(data) {
    return this.firestore.collection("Koki")
    .doc(data.payload.doc.id)
    .set({ completed: true}, {merge: true});
  }

  deleteKasir(data) {
    return this.firestore.collection("Koki")
    .doc(data.payload.doc.id).delete();
  }

  addKoki(Koki) {
    this.firestore.collection('Koki').add(Koki);
  }
}
