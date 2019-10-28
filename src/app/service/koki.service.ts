import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { promise } from 'protractor';
import { resolve, reject } from 'bluebird';

@Injectable({
  providedIn: 'root'
})
export class KokiService {

  constructor(private firestore: AngularFirestore) { }
  getKoki() 
  {
    return this.firestore.collection('Koki').snapshotChanges();
  }

  addKoki(Koki) {
    this.firestore.collection('Koki').add(Koki);
  }
  dropKasir(Koki){
    this.firestore.collection('Kasir').doc('id' ).delete
  }
}
