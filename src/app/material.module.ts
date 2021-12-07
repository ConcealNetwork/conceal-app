/*
 * This module imports and re-exports all Angular Material modules for convenience,
 * so only 1 module import is needed in your feature modules.
 * See https://material.angular.io/guide/getting-started#step-3-import-the-component-modules.
 *
 * To optimize your production builds, you should only import the components used in your app.
 */

import { NgModule } from '@angular/core';

// Angular Material
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTooltipModule
  ]
})

export class MaterialModule {}