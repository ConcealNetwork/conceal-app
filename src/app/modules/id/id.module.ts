import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdRoutingModule } from './id-routing.module';
import { IdComponent } from './id.component';


@NgModule({
  declarations: [
    IdComponent
  ],
  imports: [
    CommonModule,
    IdRoutingModule
  ]
})
export class IdModule { }
