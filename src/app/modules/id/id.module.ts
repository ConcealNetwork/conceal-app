import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { QRCodeModule } from 'angularx-qrcode';

import { SharedModule } from 'src/app/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { IdRoutingModule } from './id-routing.module';
import { IdComponent } from './id.component';


@NgModule({
  declarations: [
    IdComponent
  ],
  imports: [
    SharedModule,
    IdRoutingModule,
		MaterialModule,
		FormsModule,
		ReactiveFormsModule,
		QRCodeModule
  ]
})
export class IdModule { }
