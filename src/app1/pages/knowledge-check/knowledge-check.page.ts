import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHelperComponent } from 'src/app/shared/components/translate-helper/translate-helper.component';
import { CommonService } from 'src/app/shared/service/common.service';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { ToastrService } from 'src/app/shared/service/toastr.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-knowledge-check',
  templateUrl: './knowledge-check.page.html',
  styleUrls: ['./knowledge-check.page.scss'],
})
export class KnowledgeCheckPage extends TranslateHelperComponent {
  examDetails: any[] = [];
  currentQuestion: any = 0;
  sumitted = false;
  examAns: any[] = [];
  courseId = '';
  courseData: any = {};
  courseQuestions: any[] = [];
  constructor(
    private translateService: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private httpClient: HttpClient,
    private commonService: CommonService,
    private toastrService: ToastrService,
    public alertCtrl: AlertController,
  ) {
    super(translateService);
    this.courseQuestions = []
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.getCourseById();
  }

  goBackToLessons() {
    this.router.navigate([`/course/${this.courseId}`]);
  }

  getCourseById() {
    this.loaderService.showLoader();
    this.httpClient
      .get(
        `${environment.apiEndpoint}/student/get-course?course_id=${this.courseId}`,
      )
      .subscribe(
        (res: any) => {
          if (res.status) {
            this.courseData = res.data;
            this.courseQuestions = this.courseData.course_questions;
            if (!this.courseQuestions) {
              this.courseQuestions = [];
            }
            if(this.courseQuestions.length === 0) {
              this.showAlert();
            }
            this.courseQuestions.forEach((element) => {
              element.question_options.forEach((x) => {
                if (x.correct == null) {
                  x.correct = 2;
                }
              });
            });
          } else {
            this.toastrService.showToastr(`${res.message} ${res.error}`);
          }
          this.loaderService.hideLoader();
        },
        () => {
          this.loaderService.hideLoader();
        },
      );
  }

  async showAlert() {
    const currentLang = this.translateService.currentLang;
    const translation = this.translateService.translations[currentLang];
    const alert = await this.alertCtrl.create({
      cssClass: 'alert-model-knowledge',
      message: translation['Please make sure you have completed all lessons'],
      buttons: [translation.Ok],
    });
    await alert.present();
  }

  getKeyName(key: string) {
    return `${this.commonService.getLangPrefix()}${key}`;
  }

  getCurrectAnswerId(event, i) {
    if (!this.sumitted) {
      return;
    }
    return event.correct == 2 && event.id == this.examAns[i]
      ? 'text-red'
      : event.correct == 1 && event.id == this.examAns[i]
      ? 'text-green'
      : '';
  }

  isCurrectAnswer(item: any, i) {
    return item.question_options.find((x) => x.correct == 1).id ==
      this.examAns[i]
      ? true
      : false;
  }

  submitExam() {
    this.sumitted = true;
  }

}
