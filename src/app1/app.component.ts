import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private translateService: TranslateService) {
    this.translateService.addLangs(['en', 'ur', 'ar']);
    this.translateService.setDefaultLang('ar');
    if(!window.localStorage.getItem('currentLang')){
      window.localStorage.setItem('currentLang','ar')
    }
    if (window.localStorage.getItem('currentLang') === 'en') {
      window.document.getElementById('balady-app').classList.remove('add-rtl');
    } else {
      window.document.getElementById('balady-app').classList.add('add-rtl');
    }
    if (window.localStorage.getItem('currentLang') === 'ar') {
      this.translateService.use('ar');
    } else if (window.localStorage.getItem('currentLang') === 'ur') {
      this.translateService.use('ur');
    }
  }
}
