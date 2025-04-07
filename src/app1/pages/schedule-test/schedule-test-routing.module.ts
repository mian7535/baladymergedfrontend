import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScheduleTestPage } from './schedule-test.page';

const routes: Routes = [
  {
    path: '',
    component: ScheduleTestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleTestPageRoutingModule {}
