import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiveRoutingModule } from './live-routing.module';
import { LiveComponent } from './live.component';


@NgModule({
  declarations: [
    LiveComponent
  ],
  imports: [
    CommonModule,
    LiveRoutingModule
  ]
})
export class LiveModule { }
