import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
//@ts-ignore
// const CryptoJS = require('crypto-js');
import CryptoJS from 'crypto-js';

@Component({
  selector: 'app-open-id-connect',
  templateUrl: './open-id-connect.page.html',
  styleUrls: ['./open-id-connect.page.scss'],
})
export class OpenIdConnectPage implements OnInit {
 
  constructor(private router: Router) { }

  ngOnInit(): void {
    const status = this.getParams('status');
    // eslint-disable-next-line eqeqeq
    if (status == '0') {
      this.router.navigate(['/unauthorized']);
    } else {
      let token = this.cryptoJSAesDecrypt();
      if (this.getParams('overrideToken')) {
        token = this.getParams('overrideToken');
      }
      const isReset = this.getParams('reset');
      if (token) {
        window.localStorage.setItem('baladyAppUser', token);
        window.location.href = '/dashboard';
      } else {
        this.router.navigate(['/unauthorized']);
        // window.localStorage.removeItem('baladyAppUser');
        // setTimeout(() => {
        //   if (environment.openIdRedirect) {
        //     window.location.href = environment.openIdRedirect;
        //   }
        // }, 2000);
      }
    }
  }

  getParams(key: string) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key)
  }

  getWindow() {
    return window as any;
  }

  cryptoJSAesDecrypt() {
    const encrypted = this.getParams('access_token');
    const salt = CryptoJS.enc.Hex.parse(this.getParams('salt'));
    const iv = CryptoJS.enc.Hex.parse(this.getParams('iv'));

    const key = CryptoJS.PBKDF2(environment.passPhrase, salt, {
      hasher: CryptoJS.algo.SHA512, keySize: 64 / 8, iterations: 999
    });

    const decrypted = CryptoJS.AES.decrypt(encrypted, key, { iv });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
