import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartExamPage } from './start-exam.page';

const routes: Routes = [
  {
    path: '',
    component: StartExamPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartExamRoutingModule {}
