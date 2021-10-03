import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CdkTableModule } from '@angular/cdk/table';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { WalletRoutingModule } from './wallet-routing.module';
import { WalletComponent } from './wallet.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { WalletsComponent } from './components/wallets/wallets.component';


@NgModule({
  declarations: [
    WalletComponent,
    TransactionsComponent,
    WalletsComponent
  ],
  imports: [
    CommonModule,
		FlexLayoutModule,
		MatButtonModule,
		MatInputModule,
		MatCardModule,
		MatIconModule,
		MatMenuModule,
		MatTableModule,
		MatPaginatorModule,
		MatSortModule,
		CdkTableModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
    WalletRoutingModule
  ]
})
export class WalletModule { }
