import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ProgressBarModule } from "angular-progress-bar";
import { MyCoursesPageRoutingModule } from './my-courses-routing.module';

import { MyCoursesPage } from './my-courses.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MyCoursesPageRoutingModule,
    ProgressBarModule
  ],
  declarations: [MyCoursesPage]
})
export class MyCoursesPageModule {}
