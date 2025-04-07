import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}

  getLangPrefix() {
    const currentLang = window.localStorage.getItem('currentLang');
    return currentLang === 'en'
      ? ''
      : currentLang === 'ar'
      ? 'ar_'
      : currentLang === 'ur'
      ? 'ur_'
      : '';
  }
}
