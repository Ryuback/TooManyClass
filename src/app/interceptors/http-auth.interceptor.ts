import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { map, switchMap, take, tap } from 'rxjs/operators';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {

  constructor(private firebaseAuthentication: FirebaseAuthentication) {
    console.log('#> HttpAuthTokenInterceptor.constructor');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idTokenObservable = from (this.firebaseAuthentication.getIdToken(false));
    return idTokenObservable.pipe(
      take(1),
      map(token => this.addAuthToken(token, req)),
      tap((token) => console.log(token)),
      tap(authReq => console.log('#> HttpAuthTokenInterceptor:', authReq.url)),
      switchMap(authReq => next.handle(authReq)), // execute the request
    );
  }

  private addAuthToken(token: string | null, req: HttpRequest<any>): HttpRequest<any> {
    if (token) {
      return req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    } else {
      if (req.headers.has('Authorization')) {
        const headers = req.headers.delete('Authorization');
        return req.clone({ headers: headers });
      }
      return req;
    }
  }
}
