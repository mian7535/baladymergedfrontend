import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHelperComponent } from 'src/app/shared/components/translate-helper/translate-helper.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage extends TranslateHelperComponent {
  preferredLang = 'arabic';
  slag: any;
  constructor(
    private router: Router,
    private translateService: TranslateService,
    private route: ActivatedRoute
  ) {
    super(translateService);
    let currentLang = window.localStorage.getItem('currentLang');
    if (!currentLang) {
      currentLang = 'ar';
    }
    this.translateService.use(currentLang);
    if (currentLang === 'en') {
      this.preferredLang = 'english';
    } else if (currentLang === 'ur') {
      this.preferredLang = 'urdu';
    }
    this.slag = this.route.snapshot.paramMap.get('slag');
  }

  goToDashBoard() {
    let lang = 'ar';
    if (this.preferredLang === 'english') {
      lang = 'en';
    } else if (this.preferredLang === 'urdu') {
      lang = 'ur';
    }
    this.translateService.use(lang);
    window.localStorage.setItem('currentLang', lang);
    if (this.preferredLang === 'english') {
      window.document.getElementById('balady-app').classList.remove('add-rtl');
    } else {
      window.document.getElementById('balady-app').classList.add('add-rtl');
    }
    window.dispatchEvent(new Event('resize'));
    window.location.href = '/dashboard';
  }
}
