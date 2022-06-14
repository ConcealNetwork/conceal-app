import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagesComponent } from './messages.component';

// Auth Guard
import { AuthGuard } from 'src/app/shared/services/auth.guard';

const routes: Routes = [
	{ path: '', component: MessagesComponent },
	{ path: 'cloud', loadChildren: () => import('./cloud/cloud.module').then(m => m.CloudModule), data: { title: "Conceal Cloud Messages" }, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagesRoutingModule { }
