import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { HomeComponent } from './modules/home/home.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'wallet', loadChildren: () => import('./modules/wallet/wallet.module').then(m => m.WalletModule) },
	{ path: 'settings', loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule) },
	{ path: 'pay', loadChildren: () => import('./modules/pay/pay.module').then(m => m.PayModule) },
	{ path: 'live', loadChildren: () => import('./modules/live/live.module').then(m => m.LiveModule) },
	{ path: 'id', loadChildren: () => import('./modules/id/id.module').then(m => m.IdModule) },
	{ path: 'explorer', loadChildren: () => import('./modules/explorer/explorer.module').then(m => m.ExplorerModule) },
	{ path: 'bridge', loadChildren: () => import('./modules/bridge/bridge.module').then(m => m.BridgeModule) },
	{ path: 'deposits', loadChildren: () => import('./modules/deposits/deposits.module').then(m => m.DepositsModule) },
	{ path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }