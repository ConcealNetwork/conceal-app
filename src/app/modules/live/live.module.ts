import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

import { LiveRoutingModule } from './live-routing.module';
import { LiveComponent } from './live.component';


@NgModule({
  declarations: [
    LiveComponent
  ],
  imports: [
    CommonModule,
    LiveRoutingModule,
		MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatGridListModule,
		MatCardModule
  ]
})
export class LiveModule { }