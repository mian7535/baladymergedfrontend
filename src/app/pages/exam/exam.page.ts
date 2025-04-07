import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/service/common.service';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { TranslateHelperComponent } from 'src/app/shared/components/translate-helper/translate-helper.component';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'src/app/shared/service/toastr.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.page.html',
  styleUrls: ['./exam.page.scss'],
})
export class ExamPage extends TranslateHelperComponent implements OnInit {
  courseList: any[] = [];
  isExamPass = false;
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private commonService: CommonService,
    private loaderService: LoaderService,
    private translateService: TranslateService,
    private toastrService: ToastrService,
    public alertCtrl: AlertController,
  ) {
    super(translateService);
    this.getExams();
  }

  ngOnInit() {}

  getExams() {
    this.loaderService.showLoader();
    let userId = '';
    if (window.localStorage.getItem('userLoggedInBalady')) {
      userId = JSON.parse(window.localStorage.getItem('userLoggedInBalady')).id;
    }
    this.httpClient
      .get(`${environment.apiEndpoint}/student/exams`)
      .subscribe(
        (res: any) => {
          if (res.status) {
            this.courseList = res.data;
            this.isExamPass = res.message === 'you are pass';
          } else {
            // this.toastrService.showToastr(`${res.message} ${res.error}`);
            if(res.message) this.showAlert(res.message);
          }
          this.loaderService.hideLoader();
        },
        () => {
          this.loaderService.hideLoader();
        }
      );
  }

  async showAlert(message: string) {
    const currentLang = this.translateService.currentLang;
    const translation = this.translateService.translations[currentLang];  
    const alert = await this.alertCtrl.create({
      cssClass: 'alert-model-message',
      message,
      buttons: [translation.Ok],
    });
    await alert.present();
  }

  getMedia(row: any) {
    if (row && row.media && row.media.thumbnail) {
      return `${environment.baseUrl}${row.media.thumbnail}`;
    }
  }

  goToExamDetail(id: number) {
    this.router.navigate([`/start-exam/${id}`]);
  }

  getKeyName(key: string) {
    return `${this.commonService.getLangPrefix()}${key}`;
  }
}
