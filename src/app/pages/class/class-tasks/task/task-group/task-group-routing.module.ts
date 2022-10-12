import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskGroupPage } from './task-group.page';

const routes: Routes = [
  {
    path: '',
    component: TaskGroupPage
  },
  {
    path: 'create-group',
    loadChildren: () => import('./create-group/create-group.module').then( m => m.CreateGroupPageModule)
  },
  {
    path: 'suggestion-list',
    loadChildren: () => import('./suggestion-list/suggestion-list.module').then( m => m.SuggestionListPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskGroupPageRoutingModule {}
