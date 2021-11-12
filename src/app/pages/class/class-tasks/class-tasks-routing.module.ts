import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassTasksPage } from './class-tasks.page';

const routes: Routes = [
  {
    path: '',
    component: ClassTasksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassTasksPageRoutingModule {}
