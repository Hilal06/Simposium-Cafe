import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { ErrorStateMatcher } from "@angular/material/core";

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

  pelanggan = new FormGroup ({
    nama : new FormControl('', [Validators.required])
  });

  kasir = new FormGroup ({
    username : new FormControl('', [Validators.required]),
    password : new FormControl('', [Validators.required]),
  });

  admin = new FormGroup ({
    user : new FormControl('', [Validators.required]),
    pass : new FormControl('',[Validators.required])
  });

  dataPelanggan: any = [];

  constructor() { }
  ngOnInit() {
  }
}
