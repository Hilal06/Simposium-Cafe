import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  lastIndex = 1;

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
