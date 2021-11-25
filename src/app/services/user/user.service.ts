import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../shared/model/user.model';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { HttpClient } from '@angular/common/http';
import { api } from '../../../environments/environment';
import { Class } from '../../shared/model/class.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // users: User[];
  // private currentSubject$ = new Subject<User>();
  // current$ = this.currentSubject$.asObservable();

  constructor(private storage: Storage,
              private firebaseAuthentication: FirebaseAuthentication,
              private http: HttpClient,
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

  getCurrentUserDB(): Promise<User> {
    return this.http.get<User>(`${api}/user/me`).toPromise();
  }

  async setCurrentUser(user: User): Promise<User> {
    this.firebaseAuthentication.getCurrentUser().then(res => console.log(res));
    return this.storage.set('user', user);
  }

  logOut(): void {
    //TODO: NÃO DEIXAR USAR O BACK BUTTON
    this.storage.remove('user').then(() => this.router.navigateByUrl(''));
  }

  async isStudent(): Promise<boolean> {
    const classInfo: Class = await this.storage.get('activeClass');
    const user: User = await this.getCurrentUserDB();
    // eslint-disable-next-line no-underscore-dangle
    return !(classInfo.ownerId === user._id);
  }
}
