import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/service/common.service';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { TranslateHelperComponent } from 'src/app/shared/components/translate-helper/translate-helper.component';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'src/app/shared/service/toastr.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.page.html',
  styleUrls: ['./my-courses.page.scss'],
})
export class MyCoursesPage extends TranslateHelperComponent implements OnInit {
  @ViewChild('model') model: any;
  courseList: any[] = [];
  searchList: any[] = [];
  sortDialog: any;
  activeRow: any = 'NtoO';

  constructor(
    private routerOutlet: IonRouterOutlet,
    private httpClient: HttpClient,
    private router: Router,
    private commonService: CommonService,
    private loaderService: LoaderService,
    translateService: TranslateService,
    private toastrService: ToastrService
  ) {
    super(translateService);
  }

  ngOnInit() {
    this.getCourse();
  }

  openSheetModal() {
    this.sortDialog = true;
  }

  onHideDialog() {
    this.sortDialog = false;
  }

  getCourse() {
    this.loaderService.showLoader();
    let userId = '';
    if (window.localStorage.getItem('userLoggedInBalady')) {
      userId = JSON.parse(window.localStorage.getItem('userLoggedInBalady')).id;
    }
    this.httpClient.get(`${environment.apiEndpoint}/student/courses?user_id=${userId}`).subscribe(
      (res: any) => {
        if (res.status) {
          this.courseList = res.data;
          this.courseList.forEach(item => {
            item.course_complete = item.course_complete ? (item.course_complete && item.course_complete.is_completed ? 100 : 0) : 0;
          });
          this.searchList = res.data;
          this.searchList.forEach(item => {
            item.course_complete = item.course_complete ? (item.course_complete && item.course_complete.is_completed ? 100 : 0) : 0;
          });
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

  getRandomProgress() {
    return Math.ceil(Math.random() * 100);
  }

  getMedia(row: any) {
    if (row && row.media && row.media.thumbnail) {
      return `${environment.baseUrl}${row.media.thumbnail}`;
    }
    return '../../../assets/icon/p4.png';
  }

  goToCourseDetail(id: number) {
    this.router.navigate([`/course-details/${id}`]);
  }

  getKeyName(key: string) {
    return `${this.commonService.getLangPrefix()}${key}`;
  }

  sort(sortCol,sortDir,sortRow){
    this.activeRow = sortRow;
    this.courseList.sort((a,b)=>{
      a= a[sortCol].toLowerCase();
      b= b[sortCol].toLowerCase();
      return a.localeCompare(b) * sortDir;
    });
  }

  searchField($event){
    // eslint-disable-next-line max-len
    this.courseList = JSON.parse(JSON.stringify(this.searchList.filter(x => x[this.getKeyName('title')] && x[this.getKeyName('title')].toLowerCase().includes($event.target.value.toLowerCase()))));
  }
}
