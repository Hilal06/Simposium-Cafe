import { Injectable } from '@angular/core';
import*as CryptoJS  from "./../../../node_modules/crypto-js";
@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }
  set(keys, value){
    var Key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(keys);
    var encrypted = 
    CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), Key,
    {
      KeySize: 128/8,
      iv: iv,
      mode:CryptoJS.mode.CBC,
      padding:CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }
  //to decrypt
  get(keys, value){
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(keys);
    var decrypted = CryptoJS.AES.decrypt(value, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
