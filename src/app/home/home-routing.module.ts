import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ClientsComponent } from '../components/clients/clients.component';


const homeRoute: Routes = [
  { path: '', component: HomeComponent,
    children: [
      { path: 'clients', component: ClientsComponent },
    ]
   },
];

@NgModule({
  imports: [RouterModule.forChild(homeRoute)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
