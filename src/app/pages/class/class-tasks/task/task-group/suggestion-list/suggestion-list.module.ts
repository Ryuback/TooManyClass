import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuggestionListPageRoutingModule } from './suggestion-list-routing.module';

import { SuggestionListPage } from './suggestion-list.page';
import { NgMultiavatarModule } from 'ng-multiavatar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuggestionListPageRoutingModule,
    NgMultiavatarModule
  ],
  declarations: [SuggestionListPage]
})
export class SuggestionListPageModule {}
