import { NgModule } from '@angular/core';
import { SignupComponent } from './signup.component';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { SignUpService } from './signup.service';
import { SignUpRoutingModule } from './signup-routing.module';
import { PoDynamicModule } from '@po-ui/ng-components';
import { PoPageModule } from '@po-ui/ng-components';
import { PoButtonModule } from '@po-ui/ng-components';




@NgModule({
  imports: [PoTemplatesModule, SignUpRoutingModule, PoDynamicModule, PoPageModule, PoButtonModule],
  declarations: [SignupComponent],
  providers: [SignUpService],
})
export class SignupModule {}
