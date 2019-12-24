import { Transaksi } from './../model/Transaksi';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Koki } from "./../model/koki";

@Injectable({
  providedIn: 'root'
})
export class KokiService {

  constructor(private firestore: AngularFirestore) { }
  getKoki() {
    return this.firestore.collection('Koki').snapshotChanges();
  }

  addKoki(koki) {
    delete koki.id;
    this.firestore.collection('Koki').add(koki);
  }

  dropKoki(koki: Koki) {
    this.firestore.collection('Koki').doc(koki.id).delete();
  }

  getTodayOrder() {
    return this.firestore.collection('Transaksi').ref.where('status', '==', false).get();
  }

  statusChange(data: Transaksi) {
    data.status = true;
    this.firestore.collection('Transaksi').doc(data.id).update(data);
  }
}
