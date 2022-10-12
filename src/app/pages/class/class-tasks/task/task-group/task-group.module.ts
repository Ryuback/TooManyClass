import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskGroupPageRoutingModule } from './task-group-routing.module';

import { TaskGroupPage } from './task-group.page';
import { NgMultiavatarModule } from 'ng-multiavatar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskGroupPageRoutingModule,
    NgMultiavatarModule
  ],
  declarations: [TaskGroupPage]
})
export class TaskGroupPageModule {}
