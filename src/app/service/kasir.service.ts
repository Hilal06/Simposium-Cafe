import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { create } from 'domain';
import { resolve, reject } from 'bluebird';
import { Kasir } from './../model/Kasir'
import { Key } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class KasirService {

  constructor(private firestore : AngularFirestore) { }
  getKasir() {
    return this.firestore.collection('Kasir').snapshotChanges();
  }

  addKasir(Kasir) {
    this.firestore.collection('Kasir').add(Kasir);
  }
  dropKasir(kasir: Kasir){
    this.firestore.collection('Kasir').doc(kasir.key).delete();
  }

}
