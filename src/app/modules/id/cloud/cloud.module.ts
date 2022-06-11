import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { QRCodeModule } from 'angularx-qrcode';

import { SharedModule } from 'src/app/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { CloudRoutingModule } from './cloud-routing.module';
import { CloudComponent } from './cloud.component';


@NgModule({
  declarations: [
    CloudComponent
  ],
  imports: [
    SharedModule,
    CloudRoutingModule,
		MaterialModule,
		FormsModule,
		ReactiveFormsModule,
		QRCodeModule
  ]
})
export class CloudModule { }
