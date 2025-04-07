import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TransformService {
  constructor(public translateService: TranslateService) {}

  setLang() {
    let currentLang = window.localStorage.getItem('currentLang');
    if (!currentLang) {
      currentLang = 'en';
    }
    this.translateService.use(currentLang);
  }
}
