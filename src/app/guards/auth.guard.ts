import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { UserService } from '../services/user/user.service';
import { tap } from 'rxjs/operators';

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isAuth: boolean;

  constructor(private userService: UserService) {
    console.log('#AuthGuard.constructor');
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.isAuth();
  }
}
