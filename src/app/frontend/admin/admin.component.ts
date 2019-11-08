import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';  
import { AuthService } from "../services/auth.service";
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  id : string;

  constructor(private router: Router, private authService: AuthService) {
   }

  ngOnInit() { 
   this.id = localStorage.getItem('token'); 
  }

  logout() {
    console.log('logout');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}