import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import{JwtHelperService} from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly url="https://localhost:44392/"

  constructor(private http:HttpClient) { }
  
  Signup(data:any):Observable<any>{
    return this.http.post(this.url+'signup',data)
  }
  

}
