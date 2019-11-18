import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Transaksi } from "./../model/Transaksi";
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class TransaksiService {

  constructor(private firestore: AngularFirestore) { }
  getTransaksi() {
    this.sortData();
    return this.firestore.collection('Transaksi').snapshotChanges();
  }
  sortData() {
    const data = firebase.firestore().collection('Transaksi').limit(3).orderBy('tanggal', 'desc').onSnapshot( res => {
      console.log(res.docChanges());
    });
  }

  addTransaksi(record: Transaksi) {
    delete record.id;
    record.tanggal = firebase.firestore.FieldValue.serverTimestamp();
    this.firestore.collection('Transaksi').add(record).then(res => {
      console.log('Query add [Transaksi] Complete');
    }).catch(err => {
      console.log('Error Add [Transaksi]:: ' + err);
    });
  }
  deleteTransaksi(data) {
    this.firestore.collection('Transaksi').doc(data).delete().then(res => {
      console.log('Delete Complete');
    }).catch(err => {
      console.log('Delete Failed [Transaksi]:: ' + err);
    });
  }
}
