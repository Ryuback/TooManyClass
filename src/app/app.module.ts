import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { firebaseConfig } from '../environments/environment.prod';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [[BrowserModule, IonicModule.forRoot(), AppRoutingModule]],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    GooglePlus,
    NativePageTransitions,
    SplashScreen,
    StatusBar
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
