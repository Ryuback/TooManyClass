import { Component, OnInit } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})
export class SignupPage implements OnInit {

  res: string;

  constructor(private angularFireAuth: AngularFireAuth,
              private google: GooglePlus) { }

  ngOnInit() {
  }

  loginGoogle() {
    // TODO: CRIAR SERVICE
    this.google.login({}).then(res => this.res = res)
      .catch(err => this.res = err);
  }
}
