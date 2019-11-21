import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
  }

  isPelanggan() {
    const value = sessionStorage.getItem('Pelanggan');
    if (value === null) {
      return false;
    } else {
      return true;
    }
  }
  isAdmin() {
    const value = sessionStorage.getItem('Admin');
    return (value === null) ? false : true;
  }
  isKasir() {
    const value = sessionStorage.getItem('Kasir');
    return (value === null) ? false : true;
  }
  logout() {
    if (this.auth.isLogin()) {
      
    }
    const item = ['Admin', 'Pelanggan', 'Kasir'];
    item.forEach( i => {
      sessionStorage.removeItem(i);
    });
  }
}
