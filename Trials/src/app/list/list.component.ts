import { Component, OnInit } from '@angular/core';
import {DataService}from'../data.service';

@Component({
  selector: 'app-list',
  templateUrl:'./list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent  {
users:any=[];
 CustomersProducts:any=[];
  today = Date.now();
  dateOfToday = new Date(this.today);
  setdate  = this.dateOfToday.setMonth(this.dateOfToday.getMonth()+1);
  afterMonth;
  CustomersProduct = {
    CustomerName :'',
    ProductName:'',
    StartDate:'',
    EndDate:'',
    Status:''
   }

 constructor(public dataService:DataService) 
 {
   var data=  this.dataService.getCustomersProducts().subscribe (  
    CustomersProducts=> {
     
      this.CustomersProducts=JSON.parse(CustomersProducts["d"]);
      console.log(this.CustomersProducts);
    });
    
 }

 onsend(){
  this.CustomersProducts.unshift(this.CustomersProduct);
  this.dataService.addCustomer(this.CustomersProducts).subscribe(
    user=>
    {
      this.CustomersProducts.unshift(user);
      this.CustomersProducts.customerName='';
    } 
  );
 }
 onDelete(Cid,Pid){


 this.dataService.deleteUser(Cid,Pid).subscribe(
  res=>{
    for(let i=0;i<this.CustomersProducts.length;i++)
    {   
         if(this.CustomersProducts[i].cusID==Cid && this.CustomersProducts[i].productID==Pid)
         {
     
          this.CustomersProducts.splice(i,1);
        }
    }
    
  });
 }

 selectChanheHandler(event:any)
 {
   if(event.target.value==1){
    this.CustomersProduct.ProductName="Hybrid";
   }
   else if(event.target.value==2)
   {
    this.CustomersProduct.ProductName="DevOps";
   }
   else if(event.target.value==3)
   {
    this.CustomersProduct.ProductName="Security And Risk";
   }
   else if(event.target.value==4)
   {
    this.CustomersProduct.ProductName="Predictive Analytics";
   }
   
  
  this.CustomersProduct.StartDate=this.today.toString();
  this.CustomersProduct.EndDate=this.setdate.toString();
  this.CustomersProduct.Status='Active';
 }

}
