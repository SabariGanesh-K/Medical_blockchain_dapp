import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { DoctordataComponent } from './doctordata/doctordata.component';

import { UserdataComponent } from './userdata/userdata.component';

const routes: Routes = [
  {path:'',component:UserdataComponent},
  {path:'home',component:UserdataComponent},
  {path:'doctor',component:DoctordataComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
