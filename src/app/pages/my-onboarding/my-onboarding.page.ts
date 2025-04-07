import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHelperComponent } from 'src/app/shared/components/translate-helper/translate-helper.component';

@Component({
  selector: 'app-my-onboarding',
  templateUrl: './my-onboarding.page.html',
  styleUrls: ['./my-onboarding.page.scss'],
})
export class MyOnboardingPage extends TranslateHelperComponent {

  constructor(
    private translateService: TranslateService,
  ) {
    super(translateService);
  }
}
