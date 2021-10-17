import { Component, OnInit } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { FirebaseService } from '../../../services/firebase.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})
export class SignupPage implements OnInit {

  res: string;

  constructor(private firebaseService: FirebaseService,
              public router: Router) {
    console.log('#SignupPage.constructor');
  }

  ngOnInit() {
  }

  async loginGoogle() {
    this.firebaseService.loginWithGoogle()
      .then(res => {
        console.log('#SignupPage.firebaseService.loginGoogle', 'SUCCESS');
        this.router.navigateByUrl('dashboard');
      })
      .catch();
  }
}
