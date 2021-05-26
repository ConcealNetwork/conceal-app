import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

const routes: Routes = [
	{ path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule), data: { title: "Welcome to Conceal Hub" } },
	{ path: 'wallet', loadChildren: () => import('./modules/wallet/wallet.module').then(m => m.WalletModule), data: { title: "Conceal Wallet" } },
	{ path: 'settings', loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule), data: { title: "Conceal Hub Settings" } },
	{ path: 'pay', loadChildren: () => import('./modules/pay/pay.module').then(m => m.PayModule), data: { title: "Conceal Pay" } },
	{ path: 'live', loadChildren: () => import('./modules/live/live.module').then(m => m.LiveModule), data: { title: "Conceal Live" } },
	{ path: 'id', loadChildren: () => import('./modules/id/id.module').then(m => m.IdModule), data: { title: "Conceal ID" } },
	{ path: 'explorer', loadChildren: () => import('./modules/explorer/explorer.module').then(m => m.ExplorerModule), data: { title: "Conceal Explorer" } },
	{ path: 'bridge', loadChildren: () => import('./modules/bridge/bridge.module').then(m => m.BridgeModule), data: { title: "Conceal Bridge" } },
	{ path: 'deposits', loadChildren: () => import('./modules/deposits/deposits.module').then(m => m.DepositsModule), data: { title: "Conceal Deposits" } },
	{ path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }