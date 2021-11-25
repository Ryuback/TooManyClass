import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassTasksPage } from './class-tasks.page';

const routes: Routes = [
  {
    path: '',
    component: ClassTasksPage
  },
  {
    path: 'task',
    loadChildren: () => import('./task/task.module').then( m => m.TaskPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassTasksPageRoutingModule {}
