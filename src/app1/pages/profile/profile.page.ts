import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHelperComponent } from 'src/app/shared/components/translate-helper/translate-helper.component';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { SharedService } from 'src/app/shared/service/shared.service';
import { ToastrService } from 'src/app/shared/service/toastr.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage extends TranslateHelperComponent implements OnInit {
  activeTab: any = 'profile';
  profileImage: any;
  profileDTO: any = {};
  constructor(
    private sharedService: SharedService,
    private httpClient: HttpClient,
    private loaderService: LoaderService,
    translateService: TranslateService,
    private toastrService: ToastrService,
  ) {
    super(translateService);
  }

  ngOnInit() {
    this.getProfile();
  }

  formatDate($event) {
    return this.sharedService.dateFormat(new Date($event.target.value));
  }

  getProfile() {
    this.loaderService.showLoader();
    this.httpClient
      .get(`${environment.apiEndpoint}/student/my-profile`)
      .subscribe(
        (res: any) => {
          if (res.status) {
            this.profileDTO = res.data;
            this.profileDTO.fullName = [
              this.profileDTO.family_name,
              this.profileDTO.first_name,
              this.profileDTO.father_name,
              this.profileDTO.third_name,
            ]
              .filter((x) => x)
              .join(' ');
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

  changeTab(activeTab) {
    this.activeTab = activeTab;
  }

  chooseImage() {
    window.document.getElementById('profileFile')?.click();
  }

  imageUpload(event: any) {
    this.sharedService.imageUpload(event).then((res) => {
      this.profileImage = res;
    });
  }
}
