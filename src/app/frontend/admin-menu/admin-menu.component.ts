import { MenuService } from './../../service/menu.service';
import { Menu } from './../../model/menu';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {
  // variable
  tmp: Menu[];
  menus = new Array<Menu>();
  columsDisplay: string[] = ['Nama', 'harga', 'action'];
  dataSource = new MatTableDataSource<Menu>();

  chooseFile = 'Choose File';
  img: File;
  statusUpload = false;
  afterTouch = false;
  url;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  MenuForm = new FormGroup({
    name: new FormControl(''),
    harga: new FormControl(''),
  });

  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.menuService.getMenus().subscribe(res => {
      this.tmp = res.map( item => {
        return {
          'id': item.payload.doc.id,
          ...item.payload.doc.data()
        } as Menu;
      });
      console.log(this.tmp);
      this.menus = this.tmp;
      this.dataSource = new MatTableDataSource<Menu>(this.menus);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  saveMenu() {
    const Nama = this.MenuForm.get('name').value;
    const harga = this.MenuForm.get('harga').value;
    if (Nama !== '' && harga !== '') {
      let menu: Menu = {'id': null, 'Nama': Nama, 'harga':harga, 'image':this.url};
      this.menuService.addMenu(menu);
      this.dataSource = new MatTableDataSource<Menu>(this.menus);
      this.dataSource.sort = this.sort;
      this.clearForm();
    } else {
      console.log('Failed Input');
    }
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  hapusMenu(menu: Menu) {
    this.menuService.deleteMenu(menu);
  }
  clearForm() {
    this.MenuForm.get('name').setValue('');
    this.MenuForm.get('harga').setValue('');
    this.afterTouch = false;
    this.img = null;
  }
  image(event) {
    const file = event.target.files.item(0);
    this.img = file;
    this.chooseFile = this.img.name;
  }
  upload() {
    const file: File = this.img;
    this.menuService.uploadImage(file).then(res => {
      this.showImage(res);
    });
  }
  async showImage(url: firebase.storage.UploadTaskSnapshot) {
    this.afterTouch = true;
    try {
      this.statusUpload = true;
      this.url = await url.ref.getDownloadURL();
    } catch (error) {
      this.statusUpload = false;
    }
  }
}
