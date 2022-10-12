import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateGroupPageRoutingModule } from './create-group-routing.module';

import { CreateGroupPage } from './create-group.page';
import { NgMultiavatarModule } from 'ng-multiavatar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateGroupPageRoutingModule,
    NgMultiavatarModule
  ],
  declarations: [CreateGroupPage]
})
export class CreateGroupPageModule {}
