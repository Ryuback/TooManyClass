import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { isPlatform, Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public router:Router
  ) {
    this.inicializateApp();
    this.router.navigateByUrl('splash');
  }

  inicializateApp() {
        this.platform.ready().then(() => {
          this.statusBar.show();
          this.splashScreen.hide();
        });
    }

}
