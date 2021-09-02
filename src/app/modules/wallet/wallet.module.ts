import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { WalletRoutingModule } from './wallet-routing.module';
import { WalletComponent } from './wallet.component';


@NgModule({
  declarations: [
    WalletComponent
  ],
  imports: [
    CommonModule,
		FlexLayoutModule,
		MatButtonModule,
		MatInputModule,
		MatCardModule,
		MatIconModule,
		MatMenuModule,
    WalletRoutingModule
  ]
})
export class WalletModule { }
