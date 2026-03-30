import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared.module';
import { AuthenticatorRoutingModule } from './authenticator-routing.module';
import { AuthenticatorComponent } from './authenticator.component';

@NgModule({
  declarations: [
    AuthenticatorComponent
  ],
  imports: [
    SharedModule,
    AuthenticatorRoutingModule
  ]
})
export class AuthenticatorModule { }

