import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from "./components/home/home.component";

const routes: Routes = [
  {path: "", component:LoginComponent},
  {path: "signIn", component:LoginComponent},
  {path: "signUp", component:RegisterComponent},
  {path: "home", component: HomeComponent},
  {path: "**", redirectTo: '', pathMatch: 'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

