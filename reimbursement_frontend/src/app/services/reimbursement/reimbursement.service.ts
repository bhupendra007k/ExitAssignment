import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReimbursementService {
  private readonly url="https://localhost:44392"

  constructor(private http:HttpClient) { }

  getReimbursements(id:any):Observable<any>
  {
    return this.http.get(`${this.url}/${id}`)

  }

  AddReimbursement(data:object):Observable<object>{
    return this.http.post(this.url+"/add",data)
  }

  DeleteReimbursement(id:any):Observable<any>{
    return this.http.delete(`${this.url}/delete/${id}`)
  }

  UpdateReimbursement(id:any,data:any):Observable<any>{
    return this.http.post(`${this.url}/update/${id}`,data)
  }

  GetAllReimbursements():Observable<any>{
    return this.http.get(this.url+"/getall")
  }
  DeclineReimbursements(id:any):Observable<any>{
    return this.http.get(`${this.url}/declineReimbursement/${id}`)
  }
  GetApprovedReimbursements(id:any):Observable<any>{
    return this.http.get(`${this.url}/approveReimbursement/${id}`)
  }
  ApprovedReimbursements(id:any,data:any):Observable<any>{
    
    return this.http.post(`${this.url}/approveReimbursement/${id}`,data)
  }
  GetReimbursementById(id:any):Observable<any>{
    return this.http.get(`${this.url}/getreimbursementbyid/${id}`)
  }

  }

