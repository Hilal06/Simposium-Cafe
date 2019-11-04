import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Menu } from '../model/menu';
import { AngularFireStorage } from '@angular/fire/storage';
import { FirebaseApp } from '@angular/fire';


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  url;
  // tslint:disable-next-line: no-shadowed-variable
  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) {
  }
  getMenus() {
    return this.firestore.collection('Menu').snapshotChanges();
  }

  addMenu(menu) {
    delete menu.id;
    this.firestore.collection('Menu').add(menu);
  }

  deleteMenu(menu: Menu) {
    this.firestore.collection('Menu').doc(menu.id).delete();
  }
  async uploadImage(file: File) {
    console.log('please wait');
    if (file != null) {
      const filePath = '/ImageMenu/' + file.name;
      const snap = await this.storage.upload(filePath, file);
      return snap;
    } else {
      console.log('Upload Failed');
    }
  }
  // private async getUrl(snap: firebase.storage.UploadTaskSnapshot) {
  //   return await snap.ref.getDownloadURL();
  // }
}
