import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassPageRoutingModule } from './class-routing.module';

import { ClassPage } from './class.page';
import { NgMultiavatarModule } from 'ng-multiavatar';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassPageRoutingModule,
    NgMultiavatarModule
  ],
  declarations: [ClassPage, UserProfileComponent]
})
export class ClassPageModule {}
