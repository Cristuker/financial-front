import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { LoginService } from './login/login.service';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { HomeModule } from './home/home.module';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { PoStorageModule } from '@po-ui/ng-storage';
import { SignupModule } from './signup/signup.module';
import { AuthGuardService } from './auth/auth.service';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    LoginModule,
    HttpClientModule,
    HomeModule,
    BrowserAnimationsModule,
    PoModule,
    RouterModule.forRoot([]),
    PoTemplatesModule,
    PoStorageModule.forRoot(),
    SignupModule,
  ],
  declarations: [AppComponent],
  providers: [
    LoginService,
    provideHttpClient(withInterceptorsFromDi()),
    AuthGuardService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
