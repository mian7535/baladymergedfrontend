import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { CourseModelComponent } from 'src/app/shared/components/course-model/course-model.component';
import { TranslateHelperComponent } from 'src/app/shared/components/translate-helper/translate-helper.component';
import { CommonService } from 'src/app/shared/service/common.service';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { ToastrService } from 'src/app/shared/service/toastr.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-course',
  templateUrl: 'course-details.page.html',
  styleUrls: ['course-details.page.scss'],
})
export class CourseDetailsPage extends TranslateHelperComponent {
  courseDetails: any[] = [
    {
      index: 1,
      title: 'Introduction',
      duration: '02 : 16 mins',
    },
    {
      index: 2,
      title: 'Introduction',
      duration: '02 : 16 mins',
    },
    {
      index: 3,
      title: 'Introduction',
      duration: '02 : 16 mins',
    },
    {
      index: 4,
      title: 'Introduction',
      duration: '02 : 16 mins',
    },
    {
      index: 5,
      title: 'Introduction',
      duration: '02 : 16 mins',
    },
    {
      index: 6,
      title: 'Introduction',
      duration: '02 : 16 mins',
    },
    {
      index: 7,
      title: 'Introduction',
      duration: '02 : 16 mins',
    },
    {
      index: 8,
      title: 'Introduction',
      duration: '02 : 16 mins',
    },
    {
      index: 9,
      title: 'Introduction',
      duration: '02 : 16 mins',
    },
    {
      index: 10,
      title: 'Introduction',
      duration: '02 : 16 mins',
    },
  ];

  paragraph: any[] = [
    {
      index: 1,
      details:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt',
    },
  ];
  videoSource: any = '';
  courseId: any;
  finishCourse = false;
  feedbackGiven = false;
  courseData: any = {};
  modelOpen = false;
  typeOfSourse: any = '';
  pdfVideoSource: any = '';
  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private loaderService: LoaderService,
    translateService: TranslateService,
    public modal: ModalController,
    private toastrService: ToastrService,
  ) {
    super(translateService);
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.getCourseById();
  }

  getKeyName(key: string) {
    return `${this.commonService.getLangPrefix()}${key}`;
  }

  goBack() {
    window.history.back();
  }

  getCourseById() {
    this.loaderService.showLoader();
    this.httpClient
      .get(`${environment.apiEndpoint}/student/get-course?course_id=${this.courseId}`)
      .subscribe(
        (res: any) => {
          if (res.status) {
            this.courseData = res.data;
            this.videoSource = this.getVideoSource();
            // this.videoSource = 'https://www.youtube.com/embed/9xwazD5SyVg';
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

  totalLessons() {
    if (
      this.courseData &&
      this.courseData.sections &&
      Array.isArray(this.courseData.sections)
    ) {
      return this.courseData.sections
        .filter((x) => Array.isArray(x.lessons))
        .flatMap((x) => x.lessons).length;
    }
    return 0;
  }

  getVideoSource() {
    if (
      this.courseData &&
      this.courseData.media
    ) {
      return this.courseData.media[this.getKeyName('vedio_url')];
    }
    return '';
  }

  submitFeedback($event) {
    this.feedbackGiven = $event;
  }

  goToSubmitPage() {
    this.finishCourse = true;
  }

  showModel(lessons) {
    if (lessons.type === 'video-url') {
      this.typeOfSourse = lessons.type;
      this.pdfVideoSource = lessons.vedio_url;
    } else {
      this.typeOfSourse = lessons.type;
      this.pdfVideoSource = `${environment.baseUrl}${lessons.file}`;
    }
    this.modelOpen = true;
  }

  closeModel($event) {
    this.modelOpen = $event;
  }
}
