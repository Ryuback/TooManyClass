import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { isPlatform, Platform } from '@ionic/angular';
import { StorageService } from './services/storage/storage.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs/operators';
import { UserService } from './services/user/user.service';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public router: Router,
    private storageService: StorageService,
    private userService: UserService
  ) {
    this.inicializateApp();
    this.userService.isAuth().pipe(
      untilDestroyed(this),
      tap(r => {
        if (r) {
          this.router.navigateByUrl('dashboard');
        } else {
          this.router.navigateByUrl('splash');
        }
      })
    ).subscribe();
  }

  inicializateApp() {
    this.platform.ready().then(() => {
      this.statusBar.show();
      this.splashScreen.hide();
    });
  }

}
