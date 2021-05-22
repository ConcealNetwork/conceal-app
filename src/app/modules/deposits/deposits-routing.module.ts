import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepositsComponent } from './deposits.component';

const routes: Routes = [{ path: '', component: DepositsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepositsRoutingModule { }
