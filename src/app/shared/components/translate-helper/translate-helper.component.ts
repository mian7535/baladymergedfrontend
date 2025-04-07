import {Component, Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TranslateHelperComponent {
  constructor(translateService: TranslateService) {
    let currentLang = window.localStorage.getItem('currentLang');
    if (!currentLang) {
      currentLang = 'en';
    }
    translateService.use(currentLang);
  }

  onImgError($event: any) {
    ($event.target as HTMLImageElement).style.display = 'none';

    // $event.target.src = environment.notFoundImage;
  }
}
