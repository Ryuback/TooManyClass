import { Injectable } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { UserService } from './user/user.service';
import { HttpClient } from '@angular/common/http';
import { api } from '../../environments/environment';
import { User } from '../shared/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private google: GooglePlus,
              private firebaseAuthentication: FirebaseAuthentication,
              private userService: UserService,
              private http: HttpClient) {
    console.log('#FirebaseService.constructor');
  }

  async loginWithGoogle(): Promise<any> {
    const googleLogin = await this.google.login({
      scopes: '',
      webClientId: '527216771428-se0reto5ljlapjk0935loat01mtkd2d2.apps.googleusercontent.com',
      offline: true
    });
    await this.userService.setCurrentUser(googleLogin);
    return this.firebaseAuthentication.signInWithGoogle(googleLogin.idToken, googleLogin.accessToken);
  }

  async register(email: string,
                 password: string,
                 fullName: string,
                 givenName: string): Promise<any> {
    await this.firebaseAuthentication.createUserWithEmailAndPassword(email, password);
    await this.login(email, password);
    await this.http.post<void>(`${api}/user/afterRegisterWithEmail`,
      {
        fullName,
        givenName
      }).subscribe();
    const user = await this.http.get<User>(`${api}/user/me`).toPromise();
    return this.userService.setCurrentUser(user);
  }

  async login(email: string, password: string): Promise<any> {
    return this.firebaseAuthentication.signInWithEmailAndPassword(email, password);
  }

}
