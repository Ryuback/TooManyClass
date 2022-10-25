import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserProfilePageRoutingModule } from './user-profile-routing.module';

import { UserProfilePage } from './user-profile.page';
import { NgMultiavatarModule } from 'ng-multiavatar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserProfilePageRoutingModule,
    NgMultiavatarModule,
    ReactiveFormsModule
  ],
  declarations: [UserProfilePage]
})
export class UserProfilePageModule {}
