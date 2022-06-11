import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepositsComponent } from './deposits.component';

// Auth Guard
import { AuthGuard } from 'src/app/shared/services/auth.guard';

const routes: Routes = [
	{ path: '', component: DepositsComponent },
	{ path: 'cloud', loadChildren: () => import('./cloud/cloud.module').then(m => m.CloudModule), data: { title: "Conceal Cloud Depsoits" }, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepositsRoutingModule { }
