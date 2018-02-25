import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders}from'@angular/common/http';
// import 'rxjs/add/operator/map';


@Injectable()
export class DataService {

  users:string[];

  constructor(public httpClient:HttpClient) 
  {
   }

   getCustomersProducts()
   {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
     return this.httpClient.post('http://localhost:63926/UsersWS.asmx/getCustomersProducts',{},{ headers: headers });
    }
   addCustomer(user){
    return this.httpClient.post('http://localhost:63926/UsersWS.asmx?op=AddNewCustomer',user);
   }

   deleteUser(Cid,Pid)
   {
    return this.httpClient.delete('http://localhost:63926/UsersWS.asmx?op=deleteUser/'+Cid,Pid);
   }
}
