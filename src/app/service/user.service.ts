import { AngularFirestoreModule } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private firestore: AngularFirestoreModule) {

  }
}