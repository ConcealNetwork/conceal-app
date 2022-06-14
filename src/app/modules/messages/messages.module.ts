import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared.module';
import { MaterialModule } from 'src/app/material.module';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesComponent } from './messages.component';

@NgModule({
  declarations: [
  	MessagesComponent,
  ],
  imports: [
    MessagesRoutingModule,
		SharedModule,
		MaterialModule,
		FormsModule,
    ReactiveFormsModule,
  ]
})
export class MessagesModule { }
