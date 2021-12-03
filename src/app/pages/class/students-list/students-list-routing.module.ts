import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentsListPage } from './students-list.page';

const routes: Routes = [
  {
    path: '',
    component: StudentsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsListPageRoutingModule {}
