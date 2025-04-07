import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-translate-helper',
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
    $event.target.src = environment.notFoundImage;
  }
}
