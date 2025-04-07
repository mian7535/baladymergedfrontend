import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpenIdConnectPage } from './open-id-connect.page';

const routes: Routes = [
  {
    path: '',
    component: OpenIdConnectPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpenIdConnectPageRoutingModule {}
