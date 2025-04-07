import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CourseDetailsPage } from './course-details.page';
import { CourseDetailPageRoutingModule } from './course-details-routing.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CourseDetailPageRoutingModule,
    ScrollingModule
  ],
  declarations: [CourseDetailsPage]
})
export class CourseDetailsPageModule {}
