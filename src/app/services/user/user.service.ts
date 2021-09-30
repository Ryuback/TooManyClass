import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../shared/model/user.model';
import { Storage } from '@ionic/storage-angular';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // users: User[];
  // private currentSubject$ = new Subject<User>();
  // current$ = this.currentSubject$.asObservable();

  constructor(private storage: Storage) {
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
    return this.storage.set('user', user);
    // AuthInterceptor.user = user;
  }
}
