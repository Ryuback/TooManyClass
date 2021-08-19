import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss']
})
export class SplashPage implements OnInit {

  constructor(private router: Router,
              private nativePageTransitions: NativePageTransitions) { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigateByUrl('');
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
    this.nativePageTransitions.fade(options);
  }

}
