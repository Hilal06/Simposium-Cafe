import { Kasir } from './../../model/Kasir';
import { CryptoService } from './../../service/crypto.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, FormGroupDirective} from '@angular/forms';
import { ErrorStateMatcher } from "@angular/material/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import * as CryptoJS from 'crypto-js';


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
  listKasir = new Array<Kasir>();

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

  constructor(private authService: AuthService) { }
  ngOnInit() {
    this.authService.getKasirUser().subscribe(res => {
      res.map(res => {
        this.listKasir.push({
          'id': res.payload.doc.id,
          ...res.payload.doc.data()
        } as Kasir);
      });
    });
  }

  loginAdmin() {
    let found = false;
    const inUser = this.admin.get('userid').value;
    const inPass = this.admin.get('password').value;

    const data = [{username: 'admin', password: CryptoJS.AES.encrypt('admin', 'Area51').toString()},
                {username: 'rifaul', password: CryptoJS.AES.encrypt('rifaul', 'Area51').toString()}];
    data.forEach(user => {
      let decrypted = CryptoJS.AES.decrypt(user.password, 'Area51').toString(CryptoJS.enc.Utf8);
      if (user.username === inUser && decrypted === inPass) {
        found = true;
      }
    });
    if (found) {
      localStorage.setItem('Admin', CryptoJS.AES.encrypt(inUser, 'Area51').toString());
      this.authService.ruleAdmin();
    }
  }

  loginKasir() {
    const inUser = this.kasir.get('usernameKasir').value;
    const inPass = this.kasir.get('passwordKasir').value;
    let dec;
    let found = false;
    let curUser: Kasir;
    this.listKasir.forEach(user => {
      dec = CryptoJS.AES.decrypt(user.password, user.username).toString(CryptoJS.enc.Utf8)
      if (dec === inPass && inUser === user.username) {
        found = true;
        curUser = user;
      }
    });
    if (found) {
      localStorage.setItem('Kasir', CryptoJS.AES.encrypt(curUser.nama, 'Kasirnya').toString());
      this.authService.ruleKasir();
    } else {
      console.log('Kasir Not Found');
    }
  }

  orderPelanggan() {
    localStorage.setItem('Pelanggan', this.pelanggan.get('nama').value);
    if (this.authService.isLogin()) {
      this.authService.rulePelanggan();
    }
  }
}
