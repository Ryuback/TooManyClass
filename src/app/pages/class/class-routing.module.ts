import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClassPage } from './class.page';

const routes: Routes = [
  {
    path: '',
    component: ClassPage,
    children: [
      {
        path: 'students-list',
        loadChildren: () => import('./students-list/students-list.module').then(m => m.StudentsListPageModule)
      },
      {
        path: 'class-config',
        loadChildren: () => import('./class-config/class-config.module').then(m => m.ClassConfigPageModule)
      },
      {
        path: 'class-tasks',
        loadChildren: () => import('./class-tasks/class-tasks.module').then(m => m.ClassTasksPageModule)
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassPageRoutingModule {}
