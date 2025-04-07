import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { StartExamPage } from './start-exam.page';

import { StartExamRoutingModule } from './start-exam-routing.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    StartExamRoutingModule,
    ScrollingModule
  ],
  declarations: [StartExamPage]
})
export class StartExamPageModule {}
