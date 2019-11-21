
import { Injectable } from '@angular/core';
import { firestore } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login = false;

  constructor(private firestore: AngularFirestore) {}
  getAdmin() {
    return this.firestore.collection('Admin').snapshotChanges();
  }
  getKasirUser() {
    return this.firestore.collection('Kasir').snapshotChanges();
  }
  isLogin() {
    if (sessionStorage.length !== 0) {
      this.login = true;
    }
    return this.login;
  }
  logout() {
    if (this.isLogin()) {
      sessionStorage.clear();
      this.login = false;
    }
  }
}
