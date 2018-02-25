import { Component, OnInit } from '@angular/core';
import {DataService}from '../../data.service';

@Component({
  selector: 'app-form',
  template:
  `
  <div class="container mt-4">
  <header><h2>Trials Dashboard</h2></header>
<form (submit)="onsend()">
  <div class="form-row">
 
    <div class="col">
      <input type="text" class="form-control" placeholder="Customer Name"
[(ngModel)]="user.name" 
name="name"
#userName="ngModel"
required
      >
    </div>
    
    <div *ngIf="userName.errors?.required && userName.touched" class="alert alert-warning">
    Please Enter Customer Name
    </div>


    <div>
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
       ngDefaultControl   required
          >
         Products
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#"ngDefaultControl [(ngModel)]="user.product1" name="product1"  #userProduct="ngModel" value="hybrid">Hybrid IT</a>
            <a class="dropdown-item" href="#" ngDefaultControl  [(ngModel)]="user.product2" name="product2"  #userProduct="ngModel" value="devOps">DevOps</a>
            <a class="dropdown-item" href="#"   ngDefaultControl [(ngModel)]="user.product3" name="product3"  #userProduct="ngModel" value="predictive analytics">Predictive Analytics</a>
            <a class="dropdown-item" href="#"   ngDefaultControl [(ngModel)]="user.product4" name="product4"  #userProduct="ngModel" value="security & risk">Security & Risk</a>
          </div>

          <div *ngIf="userProduct.errors?.required && userProduct.touched" class="alert alert-warning">
          Please Choose Products
          </div>
       
          </div>
        </div>
      
      <button type="submit" class="btn btn-outline-primary">Add</button>
 
  </div>
</form>
</div>
  `,
  styleUrls: ['./form.component.css']
})
export class FormComponent  {
  CustomersProducts:any=[];
  user = {
      name :'',  products1:'',products2:'',products3:'',products4:''
}
  constructor(public dataService:DataService) 
  { 

  }
  onsend(){
    this.dataService.addCustomer(this.user).subscribe(
      user=>
      {
        this.CustomersProducts.unshift(user);
      } 
    );
  }
 
}
