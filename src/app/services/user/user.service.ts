import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../shared/model/user.model';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  current: User = null;
  // users: User[];
  // private currentSubject$ = new Subject<User>();
  // current$ = this.currentSubject$.asObservable();

  constructor() { }

  isAuth(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.getCurrentUser().then((user) => {
        observer.next(true);
        observer.complete();
      })
        .catch(err => {
          console.log(err);
          observer.next(false);
          observer.complete();
        });
    });
  }

  private getCurrentUser(): Promise<User> {
    return this.storage.get('users/me');
  }

  async setCurrentUser(user: User): Promise<User> {

    if (_.isEqual(this.current, user)) {
      return this.current;
    }
    this.current = user;
    // await this.storage.set('users/me', user);

    //   AuthInterceptor.user = user;
  }
}
