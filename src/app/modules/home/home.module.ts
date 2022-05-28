import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { MaterialModule } from 'src/app/material.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    HomeRoutingModule,
		SharedModule,
		MaterialModule
  ]
})
export class HomeModule { }
