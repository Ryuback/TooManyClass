import { Injectable } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private google: GooglePlus,
              private firebaseAuthentication: FirebaseAuthentication) { }

  async loginWithGoogle(): Promise<any> {
    const googleLogin = await this.google.login({
      scopes: '',
      webClientId: '527216771428-se0reto5ljlapjk0935loat01mtkd2d2.apps.googleusercontent.com',
      offline: true
    });
    return this.firebaseAuthentication.signInWithGoogle(googleLogin.idToken, googleLogin.accessToken);
  }
}
