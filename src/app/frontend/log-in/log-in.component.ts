import { CryptoService } from './../../service/crypto.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, FormGroupDirective} from '@angular/forms';
import { ErrorStateMatcher } from "@angular/material/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective |
    NgForm | null): boolean {
      return control && control.invalid;
    }
}

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  listAdmin;
  listKasir;

  pelanggan = new FormGroup ({
    nama : new FormControl('', [Validators.required])
  });

  kasir = new FormGroup ({
    usernameKasir : new FormControl('', [Validators.required]),
    passwordKasir : new FormControl('', [Validators.required]),
  });

  admin = new FormGroup ({
    userid : new FormControl('', [Validators.required]),
    password : new FormControl('', [Validators.required])
  });

  constructor(private router: Router, private authService: AuthService, private crypto: CryptoService) { }
  ngOnInit() {

    this.authService.getAdmin().subscribe(res => {
      this.listAdmin = res.map(res => {
        return {
          'id': res.payload.doc.id,
          ... res.payload.doc.data()
        };
      });
    });

    this.authService.getKasirUser().subscribe(res => {
      this.listKasir = res.map(res => {
        return {
          'id': res.payload.doc.id,
          ... res.payload.doc.data()
        };
      });
      console.log(this.listKasir);
    });
  }

  loginAccount(key) {
    let tmp = [];
    let username;
    let password;
    switch (key) {
      case 'Admin': tmp = [
                            {username: 'rifaul', password: this.crypto.set('rifaul', 'rifaul')},
                            {username: 'admin', password: this.crypto.set('admin', 'admin')}
                          ];
                    username = this.admin.get('userid').value;
                    password = this.admin.get('password').value;
                    break;
      case 'Kasir': tmp = this.listKasir;
                    username = this.kasir.get('usernameKasir').value;
                    password = this.kasir.get('passwordKasir').value;
                    break;
      default: console.log('login failed !!'); break;
    }
    let success = false;
    tmp.forEach(item => {
      const dec = this.crypto.get(item.username, item.password);
      if (password === dec && username === item.username) {
        success = true;
      }
    });
    if (success) {
      if (key === 'Admin') {
        this.router.navigateByUrl('admin').then(res => {
          if (res) {
            sessionStorage.setItem('Admin', this.crypto.set(username, password));
          } else {
            console.log('failed');
          }
        });
      } else if (key === 'Kasir') {
        this.router.navigateByUrl('kasir').then(res => {
          if (res) {
            sessionStorage.setItem('Kasir', this.crypto.set(username, password));
          } else {
            console.log('failed');
          }
        });
      }
    } else {
      console.log('user not found');
    }
  }

  orderPelanggan() {
    localStorage.setItem('Pelanggan', this.pelanggan.get('nama').value);
  }
}
