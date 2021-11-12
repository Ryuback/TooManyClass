import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentsListPageRoutingModule } from './students-list-routing.module';

import { StudentsListPage } from './students-list.page';
import { NgMultiavatarModule } from 'ng-multiavatar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentsListPageRoutingModule,
    NgMultiavatarModule
  ],
  declarations: [StudentsListPage]
})
export class StudentsListPageModule {}
