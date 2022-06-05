import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared.module';
import { MaterialModule } from 'src/app/material.module';

import { WalletsRoutingModule } from './wallets-routing.module';
import { WalletsComponent } from './wallets.component';


@NgModule({
  declarations: [
    WalletsComponent,
  ],
  imports: [
    WalletsRoutingModule,
		SharedModule,
		MaterialModule,
  ]
})
export class WalletModule { }
