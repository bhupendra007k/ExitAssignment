import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url="https://localhost:44392/"
  employee:any={id:null,token:null}
  jwt_token:any|undefined

  helper= new JwtHelperService();

  constructor(private http:HttpClient,private router:Router) { }
  Login(data:any): Observable<any>{
    return this.http.post(this.url+'login',data).pipe(
      map((response:any)=>{
        const decodedToken=this.helper.decodeToken(response.jwtToken);

        this.employee.id=decodedToken.UserId;
        localStorage.setItem('token',response.jwtToken)
        this.employee.token=response.jwtToken
        
        
        return this.employee;
      }))
      
    }
    
  logout(){
    localStorage.removeItem('token')
    this.router.navigate(['']);
  }
}
