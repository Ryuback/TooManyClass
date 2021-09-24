import { Component, OnInit } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})
export class SignupPage implements OnInit {

  res: string;

  constructor(private google: GooglePlus,
              private firebaseAuthentication: FirebaseAuthentication) { }

  ngOnInit() {
  }

  async loginGoogle() {
    // TODO: CRIAR SERVICE
    const googleLogin = await this.google.login({
      scopes: '',
      webClientId: '527216771428-se0reto5ljlapjk0935loat01mtkd2d2.apps.googleusercontent.com',
      offline: true
    });

    this.firebaseAuthentication.signInWithGoogle(googleLogin.idToken, googleLogin.accessToken).then(() => {
      console.log('Firebase logged in with Google');
    });
  }
}
