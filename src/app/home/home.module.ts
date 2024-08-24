import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import {
  PoMenuModule,
  PoMenuPanelModule,
  PoToolbarModule,
  PoPageModule
} from '@po-ui/ng-components';
import { HomeRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    HomeRoutingModule,
    PoMenuPanelModule,
    PoMenuModule,
    PoToolbarModule,
    PoPageModule
  ],
  declarations: [HomeComponent],
  providers: [],
})
export class HomeModule {}
