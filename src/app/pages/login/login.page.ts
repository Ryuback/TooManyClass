import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {

  constructor(private platform: Platform) {
    this.platform.backButton.pipe(
      untilDestroyed(this),
      tap(() => {})
    ).subscribe();
    console.log('#LoginPage.constructor');
  }

  ngOnInit() {}

}
