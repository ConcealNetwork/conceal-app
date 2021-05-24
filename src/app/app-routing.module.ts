import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { HomeComponent } from './modules/home/home.component';

const routes: Routes = [
	{ path: '', component: HomeComponent, data: { title: "Home" } },
	{ path: 'wallet', loadChildren: () => import('./modules/wallet/wallet.module').then(m => m.WalletModule), data: { title: "Wallet" } },
	{ path: 'settings', loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule), data: { title: "Settings" } },
	{ path: 'pay', loadChildren: () => import('./modules/pay/pay.module').then(m => m.PayModule), data: { title: "Pay" } },
	{ path: 'live', loadChildren: () => import('./modules/live/live.module').then(m => m.LiveModule), data: { title: "Live" } },
	{ path: 'id', loadChildren: () => import('./modules/id/id.module').then(m => m.IdModule), data: { title: "@ID" } },
	{ path: 'explorer', loadChildren: () => import('./modules/explorer/explorer.module').then(m => m.ExplorerModule), data: { title: "Explorer" } },
	{ path: 'bridge', loadChildren: () => import('./modules/bridge/bridge.module').then(m => m.BridgeModule), data: { title: "Bridge" } },
	{ path: 'deposits', loadChildren: () => import('./modules/deposits/deposits.module').then(m => m.DepositsModule), data: { title: "Deposits" } },
	{ path: '**', redirectTo: '', pathMatch: 'full', data: { title: "Home" } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }