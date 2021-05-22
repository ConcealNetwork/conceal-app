import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExplorerRoutingModule } from './explorer-routing.module';
import { ExplorerComponent } from './explorer.component';


@NgModule({
  declarations: [
    ExplorerComponent
  ],
  imports: [
    CommonModule,
    ExplorerRoutingModule
  ]
})
export class ExplorerModule { }
