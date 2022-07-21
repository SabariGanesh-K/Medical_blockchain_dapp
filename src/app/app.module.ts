import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { UserdataComponent } from './userdata/userdata.component';
import { DoctordataComponent } from './doctordata/doctordata.component';

import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
  
    HeaderComponent,
    UserdataComponent,
    DoctordataComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent,DoctordataComponent]
})
export class AppModule { }
