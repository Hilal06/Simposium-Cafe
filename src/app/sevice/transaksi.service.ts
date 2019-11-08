import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Transaksi } from "./../model/Transaksi";

@Injectable({
  providedIn: 'root'
})
export class TransaksiService {

  constructor(private firestore: AngularFirestore) { }
  getTransaksi() {
    return this.firestore.collection('Transaksi').snapshotChanges();
  }
  addTransaksi(record: Transaksi) {
    delete record.id;
    this.firestore.collection('Transaksi').add(record).then(res => {
      console.log('Query add [Transaksi] Complete');
    }).catch(err => {
      console.log('Error Add :: ' + err);
    });
  }
}
