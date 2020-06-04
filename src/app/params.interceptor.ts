import { environment as env } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class ParamsInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    // Clone the request and add default params
    const authReq = req.clone({
      params: req.params.append('appid', env.appId).append('units', 'metric')
    });

    // send cloned request with default params to the next handler.
    return next.handle(authReq);
  }
}
