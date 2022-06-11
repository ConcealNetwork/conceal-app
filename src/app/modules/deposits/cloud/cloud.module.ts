import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Custom Pipes
import { FilterPipe } from './pipes/filter.pipe';

import { SharedModule } from 'src/app/shared.module';
import { MaterialModule } from 'src/app/material.module';

import { CloudRoutingModule } from './cloud-routing.module';
import { CloudComponent } from './cloud.component';
import { MatrixDialog } from './dialogs/matrix/matrix.dialog';
import { ConfirmationDialog } from './dialogs/confirmation/confirmation.dialog';
import { PendingDialog } from './dialogs/pending/pending.dialog';


@NgModule({
  declarations: [
    CloudComponent,
		MatrixDialog,
		ConfirmationDialog,
		PendingDialog,
		FilterPipe
  ],
  imports: [
    CloudRoutingModule,
		SharedModule,
		MaterialModule,
		FormsModule,
    ReactiveFormsModule
  ]
})
export class CloudModule { }
