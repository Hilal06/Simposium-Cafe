import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { promise } from 'protractor';
import { Koki } from "./../model/koki";
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

  addKoki(koki) {
    delete koki.id;
    this.firestore.collection('Koki').add(koki);
  }
  dropKoki(koki: Koki){
    this.firestore.collection('Koki').doc(koki.id).delete();
  }
}
