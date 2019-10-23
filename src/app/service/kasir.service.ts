import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { create } from 'domain';
import { resolve, reject } from 'bluebird';

@Injectable({
  providedIn: 'root'
})
export class KasirService {

  constructor(private firestore : AngularFirestore) { }
  getKasir() 
   {
    return this.firestore.collection('Kasir').snapshotChanges();
  }

  addKasir(Kasir) {
    this.firestore.collection('Kasir').add(Kasir);
  }

}
