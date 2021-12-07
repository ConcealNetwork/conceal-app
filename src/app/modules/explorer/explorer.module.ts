import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared.module';
import { ExplorerRoutingModule } from './explorer-routing.module';
import { ExplorerComponent } from './explorer.component';


@NgModule({
  declarations: [
    ExplorerComponent
  ],
  imports: [
		SharedModule,
    ExplorerRoutingModule
  ]
})
export class ExplorerModule { }
