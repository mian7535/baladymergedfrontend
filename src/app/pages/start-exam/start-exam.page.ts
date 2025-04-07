import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHelperComponent } from 'src/app/shared/components/translate-helper/translate-helper.component';
import { CommonService } from 'src/app/shared/service/common.service';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { ToastrService } from 'src/app/shared/service/toastr.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-course',
  templateUrl: 'start-exam.page.html',
  styleUrls: ['start-exam.page.scss'],
})
export class StartExamPage extends TranslateHelperComponent {
  baseImageUrl: string = environment.baseUrl;
  paragraph: any[] = [
    {
      index: 1,
      details:
        'After you pass this exam you will be able to inspect and report any visual distortion.',
    },
  ];

  examId: any = '';
  examDetails: any = {
    questions: [],
  };
  examStarted = false;
  examCompleted = false;
  questionAnswer: any;
  rightAnswer: any;
  totalquestions: any;
  successExam = false;
  attempts: any = {};
  feedbackGiven = false;
  result: any = {};
  currentQuestion = 0;

  constructor(
    private httpClient: HttpClient,
    private loaderService: LoaderService,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private router: Router,
    private translateService: TranslateService,
    private toastrService: ToastrService,
    public alertCtrl: AlertController,
  ) {
    super(translateService);
    this.examId = this.route.snapshot.paramMap.get('id');
    this.getExamById();
  }

  get questionData(): any {
    if (!this.examDetails.questions) {
      return [];
    }
    return this.examDetails.questions[this.currentQuestion] ?? [];
  }

  get isAnySelected() {
    return this.questionData.options.some((x) => x.isSelected);
  }

  getExamById() {
    this.loaderService.showLoader();
    this.httpClient
      .get(
        `${environment.apiEndpoint}/student/exams/questions?exam_id=${this.examId}`,
      )
      .subscribe(
        (res: any) => {
          if (res.status) {
            this.examDetails = res.data;
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

  getKeyName(key: string) {
    return `${this.commonService.getLangPrefix()}${key}`;
  }

  startExam() {
    this.examStarted = true;
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

  clearOthers(payload: any, id: number) {
    const currentAnswer = JSON.parse(JSON.stringify(payload));
    const currentOption = this.examDetails.questions.find((x) => x.id === id);
    if (currentOption) {
      currentOption.options.forEach((element) => {
        element.isSelected = false;
      });
      currentOption.options.find((x) => x.id === currentAnswer.id).isSelected =
        currentAnswer.isSelected;
    }
  }

  nextPage() {
    if (this.currentQuestion < this.examDetails.questions.length - 1) {
      this.currentQuestion++;
    } else {
      const selectedOption = this.examDetails.questions.map((x) =>
        x.options.find((y) => y.isSelected),
      );
      const questionId = selectedOption.map((x) => x.question_id.toString());
      const arr1 = {} as any;
      for (let index = 0; index < questionId.length; index++) {
        const element = questionId[index];
        arr1[`${element}`] = `${
          selectedOption.map((x) => x.id.toString())[index]
        }`;
      }
      const answar = {
        question: questionId,
        answar: arr1,
      };
      this.loaderService.showLoader();
      this.httpClient
        .post(`${environment.apiEndpoint}/student/check-result`, answar)
        .subscribe((res: any) => {
          this.loaderService.hideLoader();
          if (res.status) {
            this.questionAnswer = res.data.result;
            this.result = res.data;
            if(res.data.message) this.showAlert(res.data.message);
            this.attempts = res.data.attempt;
            this.rightAnswer = res.data['right answars'];
            this.totalquestions = res.data['total questions'];
            this.examCompleted = true;
          } else {
            this.toastrService.showToastr(`${res.message} ${res.error}`);
          }
        });
    }
  }

  prevPage() {
    this.currentQuestion--;
    if (this.currentQuestion < 0) {
      this.currentQuestion = 0;
    } else {
      this.examCompleted = false;
    }
  }

  submitFeedback($event: any) {
    this.feedbackGiven = $event;
    if (this.questionAnswer === 'Your Are Pass') {
      this.successExam = true;
    } else {
      this.successExam = false;
    }
  }
}
