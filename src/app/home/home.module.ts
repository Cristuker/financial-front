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
  PoSearchModule
} from '@po-ui/ng-components';
import { HomeRoutingModule } from './home-routing.module';
import { ClientsComponent } from './clients/clients.component';
import { ClientsService } from './clients/clients.service';
import { CreateComponent } from './clients/create/create.component';


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
    PoSearchModule
  ],
  declarations: [HomeComponent, ClientsComponent, CreateComponent],
  providers: [
    ClientsService,
    {
      provide: ICONS_DICTIONARY,
      useValue: PhosphorIconDictionary,
    },
  ],
})
export class HomeModule {}
