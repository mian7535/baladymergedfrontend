import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHelperComponent } from 'src/app/shared/components/translate-helper/translate-helper.component';

@Injectable({
  providedIn: 'root',
})
export class LoaderService extends TranslateHelperComponent {
  constructor(private translateService: TranslateService,public loadingController: LoadingController) {
    super(translateService)
  }

  showLoader() {
    const currentLang = this.translateService.currentLang;
    const translation = this.translateService.translations[currentLang]; 
    this.loadingController
      .create({
        message: translation['Please Wait'] ?? 'الرجاء الانتظار',
        duration: 3000
      })
      .then((response) => {
        response.present();
      });
  }

  hideLoader() {
    this.loadingController
      .dismiss()
      .then((response) => {
        console.log('Loader closed!', response);
      })
      .catch((err) => {
        console.log('Error occured : ', err);
      });
  }

}
