import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, Subject } from 'rxjs';
import { UserService } from '../services/user/user.service';

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService) {
    console.log('#AuthGuard.constructor');
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuth = new Subject<boolean>();
    this.userService.isAuth().subscribe(auth => {
        isAuth.next(true);
        isAuth.complete();
      },
      error => {
        isAuth.next(false);
        isAuth.complete();
      });

    return isAuth.asObservable();
  }
}
