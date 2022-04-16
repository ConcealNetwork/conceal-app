import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Custom Pipes
import { FilterPipe } from './pipes/filter.pipe';

import { SharedModule } from 'src/app/shared.module';
import { MaterialModule } from 'src/app/material.module';

import { DepositsRoutingModule } from './deposits-routing.module';
import { DepositsComponent } from './deposits.component';
import { MatrixDialog } from './dialogs/matrix/matrix.dialog';
import { ConfirmationDialog } from './dialogs/confirmation/confirmation.dialog';
import { PendingDialog } from './dialogs/pending/pending.dialog';


@NgModule({
  declarations: [
    DepositsComponent,
		MatrixDialog,
		ConfirmationDialog,
		PendingDialog,
		FilterPipe
  ],
  imports: [
    DepositsRoutingModule,
		SharedModule,
		MaterialModule,
		FormsModule,
    ReactiveFormsModule
  ]
})
export class DepositsModule { }
