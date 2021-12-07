import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CdkTableModule } from '@angular/cdk/table';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';

import { SharedModule } from 'src/app/shared.module';
import { DepositsRoutingModule } from './deposits-routing.module';
import { DepositsComponent } from './deposits.component';
import { MatrixDialog } from './dialogs/matrix/matrix.dialog';
import { ConfirmationDialog } from './dialogs/confirmation/confirmation.dialog';


@NgModule({
  declarations: [
    DepositsComponent,
		MatrixDialog,
		ConfirmationDialog
  ],
  imports: [
    DepositsRoutingModule,
		SharedModule,
		FormsModule,
    ReactiveFormsModule,
		MatAutocompleteModule,
		MatButtonModule,
		MatInputModule,
		MatCardModule,
		MatIconModule,
		MatMenuModule,
		MatTableModule,
		CdkTableModule,
		MatSliderModule,
		MatFormFieldModule,
		MatSelectModule,
		MatTooltipModule,
		MatTabsModule,
		MatProgressBarModule,
		MatDialogModule
  ]
})
export class DepositsModule { }
