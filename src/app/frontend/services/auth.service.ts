import { Router } from '@angular/router';
import { AuthGuard } from './../guars/auth.guard';

import { Injectable } from '@angular/core';
import { firestore } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login = false;

  constructor(private firestore: AngularFirestore, private router: Router) {}
  getAdmin() {
    return this.firestore.collection('Admin').snapshotChanges();
  }
  getKasirUser() {
    return this.firestore.collection('Kasir').snapshotChanges();
  }
  isLogin() {
    return (localStorage.length !== 0) ? true : false;
  }
  logout() {
    if (this.isLogin()) {
      sessionStorage.clear();
      localStorage.clear();
      this.login = false;
    }
  }

  rulePelanggan() {
    this.router.navigate(['/menu']);
  }
}
