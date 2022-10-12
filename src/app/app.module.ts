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
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import { NgMultiavatarModule } from 'ng-multiavatar';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpAuthInterceptor } from './interceptors/http-auth.interceptor';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FormBuilder } from '@angular/forms';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

const firebaseConfig = {
  apiKey: 'AIzaSyBlNWGRWBgJjoS5QhQMUJlb8a-du97C0gM',
  authDomain: 'toomanyclass-3ff72.firebaseapp.com',
  projectId: 'toomanyclass-3ff72',
  storageBucket: 'tombolas-3ff72.appspot.com',
  messagingSenderId: '527216771428',
  appId: '1:527216771428:web:dd0f6b8dbd708e11d43a71'
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
    }),
    NgMultiavatarModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    NgMultiavatarModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true },
    GooglePlus,
    NativePageTransitions,
    SplashScreen,
    StatusBar,
    HttpClient,
    FormBuilder,
    FirebaseAuthentication,
    SocialSharing
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
