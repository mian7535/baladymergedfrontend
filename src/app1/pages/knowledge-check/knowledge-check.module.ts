import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KnowledgeCheckPageRoutingModule } from './knowledge-check-routing.module';

import { KnowledgeCheckPage } from './knowledge-check.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    KnowledgeCheckPageRoutingModule,
    ScrollingModule
  ],
  declarations: [KnowledgeCheckPage]
})
export class KnowledgeCheckPageModule {}
