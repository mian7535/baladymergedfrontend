import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHelperComponent } from 'src/app/shared/components/translate-helper/translate-helper.component';
import { CommonService } from 'src/app/shared/service/common.service';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { ToastrService } from 'src/app/shared/service/toastr.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage extends TranslateHelperComponent implements OnInit {
  profileDTO: any = {};
  videoSource: any = 'https://www.youtube.com/embed/9xwazD5SyVg';
  videoInfo: any = {};

  constructor(
    translateService: TranslateService,
    private httpClient: HttpClient,
    private toastrService: ToastrService,
    private loaderService: LoaderService,
    private router: Router,
    private commonService: CommonService,
  ) {
    super(translateService);
    if (window.location.href.includes('reload')) {
      window.location.href = '/dashboard';
    }
  }

  ngOnInit() {
    this.getProfile();
    this.getVideoLink();
  }

  navigateTo() {
    this.router.navigate(['/home']);
  }

  getVideoLink() {
    this.httpClient
      .get(`${environment.apiEndpoint}/student/dashbaord`)
      .subscribe(
        (res: any) => {
          if (res.status) {
            this.videoInfo = res.data;
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

  getProfile() {
    this.httpClient
      .get(`${environment.apiEndpoint}/student/my-profile`)
      .subscribe(
        (res: any) => {
          if (res.status) {
            this.profileDTO = res.data;
            this.profileDTO.fullName = [
              this.profileDTO.first_name,
              this.profileDTO.father_name,
              this.profileDTO.third_name,
              this.profileDTO.family_name,
            ]
              .filter((x) => x)
              .join(' ');
              window.localStorage.setItem('userLoggedInBalady', JSON.stringify(this.profileDTO));
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
}
