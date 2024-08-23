import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { LoginService } from './login.service';
import { LoginRoutingModule } from './login-routing.module';


@NgModule({
  imports: [
    LoginRoutingModule,
    PoTemplatesModule,
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule { }
