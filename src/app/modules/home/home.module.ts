import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { TrendModule } from 'ngx-trend';
import { MomentModule } from 'ngx-moment';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
		FlexLayoutModule,
		MatCardModule,
		MatIconModule,
		MatButtonModule,
		TrendModule,
		MomentModule
  ]
})
export class HomeModule { }
