import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { StorageService } from './services/storage/storage.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UserService } from './services/user/user.service';
import { tap } from 'rxjs/operators';

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

    console.log('#AppComponent.constructor');
    this.platform.ready().then(() => {
      console.log('PLATFORM IS READY');
      this.statusBar.show();
      this.router.navigateByUrl('splash');
      this.userService.isAuth().pipe(
        untilDestroyed(this),
        tap(async r => {
          if (r === true) {
            await this.router.navigateByUrl('dashboard');
          } else {
            await this.router.navigateByUrl('splash');
          }
        })
      ).subscribe();
    });
  }
}
