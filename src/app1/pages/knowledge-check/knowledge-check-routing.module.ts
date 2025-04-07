import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KnowledgeCheckPage } from './knowledge-check.page';

const routes: Routes = [
  {
    path: '',
    component: KnowledgeCheckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KnowledgeCheckPageRoutingModule {}
