import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScheduleTestPageRoutingModule } from './schedule-test-routing.module';

import { ScheduleTestPage } from './schedule-test.page';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ScheduleTestPageRoutingModule,
    MaterialModule
  ],
  declarations: [ScheduleTestPage]
})
export class ScheduleTestPageModule {}
