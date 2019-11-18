import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, FormGroupDirective, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from "@angular/material/core";
import { Router } from "@angular/router";
import { Login } from "../interfaces/login";
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
  lastIndex = 1;
  mathcer = new MyErrorStateMatcher()
  users: any = [];
  hide = true;
  model : Login = { userid: "admin", password: "admin"};
  admin: FormGroup;
  returnUrl : string
  message : string;

  pelanggan = new FormGroup ({
    nama : new FormControl('', [Validators.required])
  });

  kasir = new FormGroup ({
    username : new FormControl('', [Validators.required]),
    password : new FormControl('', [Validators.required]),
  });

  // admin = new FormGroup ({
  //   username : new FormControl('', [Validators.required]),
  //   password : new FormControl('', [Validators.required])
  // });

  dataPelanggan = new FormGroup({
    nama: new FormControl('', [Validators.required])
  });

  constructor(private formBuilder : FormBuilder, private router : Router, private authService : AuthService) { }
  ngOnInit() {
    this.admin = this.formBuilder.group({
      userid: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = '/admin';
    this.authService.logout();
  }

  get f() { return this.admin.controls; }

  login() {
    if (this.admin.invalid) {
      return;
    }
    else {
      if (this.f.userid.value == this.model.userid && this.f.password.value == this.model.password) {
        console.log("Login berhasil");
        localStorage.setItem('isLoggedIn', "true");
        localStorage.setItem('token', this.f.userid.value);
        this.router.navigate([this.returnUrl]);
      }
      else {
        this.message = "Cek kembali user dan password Anda";
      }
    }
  }
  orderPelanggan() {
    localStorage.setItem('Pelanggan', this.pelanggan.get('nama').value);
  }
}
