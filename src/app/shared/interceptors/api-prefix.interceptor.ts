import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';

import {Observable} from 'rxjs/internal/Observable';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {AlertController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

/**
 * Prefixes all requests with `environment.apiEndpoint`.
 */
@Injectable({
  providedIn: 'root',
})
export class ApiPrefixInterceptor implements HttpInterceptor {
  constructor(private route: Router, public alertCtrl: AlertController, private translateService: TranslateService) {
  }

  isAlert: boolean = true;

  async showAlert(message: string) {
    const currentLang = this.translateService.currentLang;
    const translation = this.translateService.translations[currentLang];
    const alert = await this.alertCtrl.create({
      cssClass: 'alert-model-general',
      message,
      buttons: [translation.Ok],
    });
    if (alert) {
      if (this.isAlert) {
        this.isAlert = false;
        await alert.present();
      }
    }
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (!request.url.includes('.json') && !request.url.includes('.html')) {
      let token = window.localStorage.getItem('baladyAppUser');
      if (!token) {
        token = environment.staticToken;
      }
      request = request.clone({
        setHeaders: {
          authorization: token,
        },
      });
      return next.handle(request).pipe(
        catchError((error) => {
          if (error.status === 401 || error.status === 403) {
            // if (error.error.message) {
            //   this.showAlert(error.error.message);
            // }
            if (error.error.message == "That You Are Not Qualified Anymore.") {
              this.route.navigate(['/home/fail']);
            } else if (error.error.message == "unauthorized") {
              this.route.navigate(['/unauthorized']);
            } else {
              this.route.navigate(['/home']);
            }
            return throwError(error.statusText);
          }
          return throwError(error.statusText);
        }),
      );
    }
    return next.handle(request);
  }
}
