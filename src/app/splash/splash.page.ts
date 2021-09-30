import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { UserService } from '../services/user/user.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss']
})
export class SplashPage implements OnInit {

  constructor(private router: Router,
              private nativePageTransitions: NativePageTransitions,
              private userService: UserService) { }

  ngOnInit() {
    setTimeout(() => {
      this.userService.isAuth().pipe(
        untilDestroyed(this),
        tap(r => {
          if (r) {
            this.router.navigateByUrl('dashboard');
          } else {
            this.router.navigateByUrl('');
          }
        })
      ).subscribe();
    }, 3500);
  }

  ionViewWillLeave() {
    const options: NativeTransitionOptions = {
      duration: 2000,
      slowdownfactor: 3,
      slidePixels: 20,
      iosdelay: 100,
      androiddelay: 150,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 60
    };
    return this.nativePageTransitions.fade(options);
  }

}
