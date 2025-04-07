import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-open-id-connect',
  templateUrl: './open-id-connect.page.html',
  styleUrls: ['./open-id-connect.page.scss'],
})
export class OpenIdConnectPage implements OnInit {
  canRedirect: string = environment.openIdRedirect;
  constructor(private router: Router) { }

 ngOnInit(): void {
    const status = this.getParams('status');

    // eslint-disable-next-line eqeqeq
    if (status == '0') {
      this.router.navigate(['/unauthorized']);
    } else {
      let token = this.cryptoJSAesDecrypt();

      const isReset = this.getParams('reset');
      if (token && !isReset) {
        window.localStorage.setItem('baladyAppUser', token);
        window.location.href = '/dashboard';
      } else {
        window.localStorage.removeItem('baladyAppUser');
        setTimeout(() => {
          if (environment.openIdRedirect) {
            window.location.href = environment.openIdRedirect;
          }
        }, 4000);
      }
    }
  }

  getParams(key: string) {
    const searchParams = window.location.search.slice(1);
    const splitParams = searchParams.split('&');
    const isExist = splitParams.find(x => x.startsWith(`${key}=`));
    if (isExist) {
      return decodeURIComponent(isExist.replace(`${key}=`, ''));
    }
    return '';
  }

  getWindow() {
    return window as any;
  }

  cryptoJSAesDecrypt() {
    const encrypted = this.getParams('access_token');
    const salt = this.getWindow().CryptoJS.enc.Hex.parse(this.getParams('salt'));
    const iv = this.getWindow().CryptoJS.enc.Hex.parse(this.getParams('iv'));

    const key = this.getWindow().CryptoJS.PBKDF2(environment.passPhrase, salt, {
      hasher: this.getWindow().CryptoJS.algo.SHA512, keySize: 64 / 8, iterations: 999
    });

    const decrypted = this.getWindow().CryptoJS.AES.decrypt(encrypted, key, { iv });

    return decrypted.toString(this.getWindow().CryptoJS.enc.Utf8);
  }
}
