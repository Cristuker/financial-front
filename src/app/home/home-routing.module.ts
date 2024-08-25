import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ClientsComponent } from '../components/clients/clients.component';
import { AuthGuardService } from '../auth/auth.service';

const homeRoute: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'clients',
        component: ClientsComponent,
        canActivate: [AuthGuardService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(homeRoute)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
