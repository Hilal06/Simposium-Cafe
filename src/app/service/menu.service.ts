import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Menu } from '../model/menu';
import { AngularFireStorage } from '@angular/fire/storage';
import { FirebaseApp } from '@angular/fire';
import * as firebase from 'firebase';


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
    this.firestore.collection('Menu').add(menu).then(res => {
      console.log('query add success');
    }).catch(err => {
      console.log('failed to add :: ' + err);
    });
  }

  deleteMenu(menu: Menu) {
    this.deleteImage(menu.image);
    this.firestore.collection('Menu').doc(menu.id).delete().then(res => {
      console.log('Delete record success');
    }).catch(err => {
      console.log('Error deleting record! ::' + err);
    });
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
  async deleteImage(doc) {
    const docRef = firebase.storage().refFromURL(doc);
    docRef.delete().then(res => {
      console.log('Delete Success!');
    }).catch(error => {
      console.log( 'Image delete failed! :: ' + error);
    });
  }
  // private async getUrl(snap: firebase.storage.UploadTaskSnapshot) {
  //   return await snap.ref.getDownloadURL();
  // }
}
