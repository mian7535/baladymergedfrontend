import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UnauthorizedPageRoutingModule } from './unauthorized-routing.module';

import { UnauthorizedPage } from './unauthorized.page';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    UnauthorizedPageRoutingModule,
    ScrollingModule
  ],
  declarations: [UnauthorizedPage]
})
export class UnauthorizedPageModule {}
