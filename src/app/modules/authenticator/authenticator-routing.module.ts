import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatorComponent } from './authenticator.component';

const routes: Routes = [{ path: '', component: AuthenticatorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticatorRoutingModule { }

