import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { promise } from 'protractor';
import { Transaksi } from "./../model/Transaksi";
import { resolve, reject } from 'bluebird';
@Injectable({
  providedIn: 'root'
})
export class TransaksiService {

  constructor(private firestore: AngularFirestore) { }
  getTransaksi() 
  {
    return this.firestore.collection('Transaksi').snapshotChanges();
  }
  
}
