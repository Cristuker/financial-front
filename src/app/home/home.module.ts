import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import {
  PoMenuModule,
  PoMenuPanelModule,
  PoToolbarModule,
  PoPageModule,
  PoTableModule,
  ICONS_DICTIONARY,
  PhosphorIconDictionary,
  PoModalModule,
  PoButtonModule,
  PoDynamicModule,
  PoLoadingModule,
  PoFieldModule,
  PoSearchModule,
  PoInfoModule,
} from '@po-ui/ng-components';
import { HomeRoutingModule } from './home-routing.module';
import { ClientsComponent } from '../components/clients/clients.component';
import { ClientsService } from '../components/clients/clients.service';
import { CreateClientComponent } from '../components/clients/create/create.component';
import { CreateContractsComponent } from '../components/contracts/create/create.component';
import { ContractService } from '../components/contracts/contracts.service';
import { UpdateContractComponent } from '../components/contracts/update/update.component';
import { UpdateClientComponent } from '../components/clients/update/update.component';

@NgModule({
  imports: [
    HomeRoutingModule,
    PoMenuPanelModule,
    PoMenuModule,
    PoToolbarModule,
    PoPageModule,
    PoTableModule,
    PoModalModule,
    PoButtonModule,
    PoDynamicModule,
    PoLoadingModule,
    PoFieldModule,
    PoSearchModule,
    PoInfoModule
  ],
  declarations: [
    HomeComponent,
    ClientsComponent,
    CreateClientComponent,
    CreateContractsComponent,
    UpdateContractComponent,
    UpdateClientComponent
  ],
  providers: [
    ClientsService,
    ContractService,
    {
      provide: ICONS_DICTIONARY,
      useValue: PhosphorIconDictionary,
    },
  ],
})
export class HomeModule {}
