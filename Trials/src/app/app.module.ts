import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import{FormsModule} from '@angular/forms';
import { ListComponent } from './list/list.component'
import {DataService}from'./data.service';
import {HttpClientModule}from'@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
