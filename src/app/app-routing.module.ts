import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from "./components/home/home.component";
import { ExploreComponent } from "./components/explore/explore.component";
import { EventsComponent } from "./components/events/events.component";
import { EventListComponent } from "./components/event-list/event-list.component";

const routes: Routes = [
  {path: "", component:LoginComponent},
  {path: "signIn", component:LoginComponent},
  {path: "signUp", component:RegisterComponent},
  {path: "home", component: HomeComponent},
  {path: "explore", component: ExploreComponent},
  {path: "events", component: EventsComponent},
  {path: "eventList", component: EventListComponent},
  {path: "**", redirectTo: '', pathMatch: 'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

