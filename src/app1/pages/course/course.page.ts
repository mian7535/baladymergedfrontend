import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHelperComponent } from 'src/app/shared/components/translate-helper/translate-helper.component';
import { CommonService } from 'src/app/shared/service/common.service';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { ToastrService } from 'src/app/shared/service/toastr.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-course',
  templateUrl: 'course.page.html',
  styleUrls: ['course.page.scss'],
})
export class CoursePage extends TranslateHelperComponent implements OnDestroy,OnInit {
  baseImageUrl: string = environment.baseUrl;
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
  courseId = '';
  videoSource: any = '';
  courseData: any = {};
  startFeedback = false;
  showTakeExam = false;
  modelOpen = false;
  typeOfSourse: any = '';
  pdfVideoSource: any = '';
  courseModel = false;
  shoeDescription = false;
  finishCourse = true;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    translateService: TranslateService,
    private loaderService: LoaderService,
    private httpClient: HttpClient,
    private commonService: CommonService,
    private toastrService: ToastrService,
    private changeDetector: ChangeDetectorRef
  ) {
    super(translateService);
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.getCourseById();
  }

  ngOnDestroy(): void {
    this.courseModel = false;
  }

  ngOnInit(): void {
    this.getCourseById();
  }

  goToCourseDetail() {
    this.courseModel = false;
    this.changeDetector.detectChanges();
    this.router.navigate([`/course-details/${this.courseId}`]);
  }

  getKeyName(key: string) {
    return `${this.commonService.getLangPrefix()}${key}`;
  }

  goToSubmitPage() {
    this.router.navigate([`/start-exam/${this.courseId}`]);
  }

  getVideoSource() {
    if (
      this.courseData &&
      this.courseData.media
    ) {
      if (
        this.courseData &&
        this.courseData.media
      ) {
        return this.getKeyName(this.courseData.media.vedio_url);
      }
    }
    return '';
  }

  completeLesson(payload) {
    this.httpClient
      .post(
        `${environment.apiEndpoint}/student/lesson-completed?course_id=${this.courseId}&is_completed=1&lesson_id=${payload.id}`,
        {}
      )
      .subscribe((res) => {});
    this.getCourseById();
  }

  getCourseById() {
    this.loaderService.showLoader();
    this.httpClient
      .get(
        `${environment.apiEndpoint}/student/get-course?course_id=${this.courseId}`
      )
      .subscribe(
        (res: any) => {
          if (res.status) {
            this.courseData = res.data;
            this.videoSource = this.getVideoSource();
            if (this.courseData.sections) {
              this.courseData.sections.push({
                name: 'Knowledge Check',
                // eslint-disable-next-line @typescript-eslint/naming-convention
                ar_name: 'Knowledge Check',
                // eslint-disable-next-line @typescript-eslint/naming-convention
                ur_name: 'Knowledge Check',
                lessons: [
                  {
                    title: 'Test your knowledge',
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    ar_title: 'Test your knowledge',
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    ur_title: 'Test your knowledge',
                  },
                ],
                isKnowledgeCheck: true,
              });
            }
            if(this.courseData.percentage == 100) this.finishCourse = false;
            else this.finishCourse = true;
          } else {
            this.toastrService.showToastr(`${res.message} ${res.error}`);
          }
          this.loaderService.hideLoader();
        },
        () => {
          this.loaderService.hideLoader();
        }
      );
  }

  goToCheck(course) {
    if (course.isKnowledgeCheck) {
      this.router.navigate([`/knowledge-check/${this.courseId}`]);
    }
  }

  addFeedback() {
    this.startFeedback = true;
  }

  submitFeedback($event: any) {
    this.startFeedback = true;
    this.router.navigate(['/dashboard']);
    // this.showTakeExam = true;
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

  openMenu() {
    this.courseModel = true;
  }

  onHideDialog() {
    this.courseModel = false;
  }

  showDescriptionProblem() {
    this.courseModel = false;
    this.shoeDescription = true;
  }
}
