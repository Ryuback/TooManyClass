import { Component, OnInit } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { FirebaseService } from '../../../services/firebase.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})
export class SignupPage implements OnInit {

  res: string;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
  }

  async loginGoogle() {
    this.firebaseService.loginWithGoogle()
      .then(res => console.log('#SignupPage.firebaseService.loginGoogle', 'SUCCESS'))
      .catch();
  }
}
