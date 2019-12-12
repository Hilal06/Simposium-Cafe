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
    const value = localStorage.getItem('Pelanggan');
    if (value === null) {
      return false;
    } else {
      return true;
    }
  }
  isAdmin() {
    const value = localStorage.getItem('Admin');
    return (value === null) ? false : true;
  }
  isKasir() {
    const value = localStorage.getItem('Kasir');
    return (value === null) ? false : true;
  }
  logOut() {
    if (localStorage.length !== 0) {
      localStorage.clear();
      this.router.navigate(['/home']);
    }
  }
  tourToMenu() {
    if (this.isPelanggan()) {
      this.router.navigate(['menu']);
    }
  }
  tourToAdmin() {
    if (this.isAdmin()) {
      this.router.navigate(['admin']);
    }
  }
  tourToKasir() {
    if (this.isKasir()) {
      this.router.navigate(['kasir']);
    }
  }
  tourToKoki() {
    this.router.navigate(['koki']);
  }
}
