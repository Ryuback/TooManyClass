import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../shared/model/user.model';
import { Storage } from '@ionic/storage-angular';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import {FirebaseAuthentication} from '@ionic-native/firebase-authentication/ngx';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // users: User[];
  // private currentSubject$ = new Subject<User>();
  // current$ = this.currentSubject$.asObservable();

  constructor(private storage: Storage,
              private firebaseAuthentication: FirebaseAuthentication,
              private router: Router) {
    console.log('#UserService.constructor');
  }

  isAuth(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.getCurrentUser().then((user) => {
        if (user) {
          observer.next(true);
          observer.complete();
        } else {
          observer.next(false);
          observer.complete();
        }
      });
    });
  }

  getCurrentUser(): Promise<User> {
    return this.storage.get('user');
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  setCurrentUser(user: User): Promise<User> {
    this.firebaseAuthentication.getCurrentUser().then(res => console.log(res));
    return this.storage.set('user', user);
    // AuthInterceptor.user = user;
  }

  logOut(): void {
    //TODO: NÃO DEIXAR USAR O BACK BUTTON
    this.storage.remove('user').then(() => this.router.navigateByUrl(''));
  }
}
