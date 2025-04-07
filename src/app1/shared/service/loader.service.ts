import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  constructor(public loadingController: LoadingController) {}

  showLoader() {
    this.loadingController
      .create({
        message: 'يرجى الإنتظار',
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
