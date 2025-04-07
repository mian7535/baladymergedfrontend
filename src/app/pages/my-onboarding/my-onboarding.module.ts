import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyOnboardingPageRoutingModule } from './my-onboarding-routing.module';

import { MyOnboardingPage } from './my-onboarding.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    MyOnboardingPageRoutingModule
  ],
  declarations: [MyOnboardingPage]
})
export class MyOnboardingPageModule {}
