import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassTasksPageRoutingModule } from './class-tasks-routing.module';

import { ClassTasksPage } from './class-tasks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassTasksPageRoutingModule
  ],
  declarations: [ClassTasksPage]
})
export class ClassTasksPageModule {}
