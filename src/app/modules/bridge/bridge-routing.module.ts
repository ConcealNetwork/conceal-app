import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BridgeComponent } from './bridge.component';

const routes: Routes = [{ path: '', component: BridgeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BridgeRoutingModule { }
