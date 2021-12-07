import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared.module';
import { IdRoutingModule } from './id-routing.module';
import { IdComponent } from './id.component';


@NgModule({
  declarations: [
    IdComponent
  ],
  imports: [
    SharedModule,
    IdRoutingModule
  ]
})
export class IdModule { }
