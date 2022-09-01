import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClassConfigPage } from './class-config.page';

const routes: Routes = [
  {
    path: '',
    component: ClassConfigPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ClassConfigPageRoutingModule {}
