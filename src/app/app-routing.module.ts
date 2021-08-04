import { UserComponent } from './components/user/user.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { EvolveComponent } from './components/evolve/evolve.component';
import { GuessComponent } from './components/guess/guess.component';
import { HomeComponent } from './components/home/home.component';



const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'lienlac',component:ContactComponent},
  {path:'dudoan',component:GuessComponent},
  {path:'dienbien',component:EvolveComponent},
  {path:'taikhoan',component:UserComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
