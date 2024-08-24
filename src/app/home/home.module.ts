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
} from '@po-ui/ng-components';
import { HomeRoutingModule } from './home-routing.module';
import { ClientsComponent } from './clients/clients.component';
import { ClientsService } from './clients/clients.service';

@NgModule({
  imports: [
    HomeRoutingModule,
    PoMenuPanelModule,
    PoMenuModule,
    PoToolbarModule,
    PoPageModule,
    PoTableModule,
  ],
  declarations: [HomeComponent, ClientsComponent],
  providers: [
    ClientsService,
    {
      provide: ICONS_DICTIONARY,
      useValue: PhosphorIconDictionary,
    },
  ],
})
export class HomeModule {}
