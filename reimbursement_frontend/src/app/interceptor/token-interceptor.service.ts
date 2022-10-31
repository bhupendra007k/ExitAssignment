import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable,catchError } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';


@Injectable(
)
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authservice:AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   const  token =localStorage.getItem('token')
   if(token){
    req=req.clone({
      setHeaders:{
        'Content-Type':'application/json',
        Authorization:`Bearer ${token}`,
      },
    });
  }
  return next.handle(req).pipe(catchError((err)=>{
    if(err.status===401){
      this.authservice.logout();
    }
  
    return throwError(()=>err);
  }))
}
}
