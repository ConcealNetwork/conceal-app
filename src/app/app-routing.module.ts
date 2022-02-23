import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

// Auth Guard
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
	{ path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule), data: { title: "Conceal App" } },
	{ path: 'wallets', loadChildren: () => import('./modules/wallets/wallets.module').then(m => m.WalletModule), data: { title: "Conceal Wallet" }, canActivate: [AuthGuard] },
	{ path: 'deposits', loadChildren: () => import('./modules/deposits/deposits.module').then(m => m.DepositsModule), data: { title: "Conceal Deposits" }, canActivate: [AuthGuard] },
	{ path: 'pay', loadChildren: () => import('./modules/pay/pay.module').then(m => m.PayModule), data: { title: "Conceal Pay" }, canActivate: [AuthGuard] },
	{ path: 'id', loadChildren: () => import('./modules/id/id.module').then(m => m.IdModule), data: { title: "Conceal ID" }, canActivate: [AuthGuard] },
	{ path: 'live', loadChildren: () => import('./modules/live/live.module').then(m => m.LiveModule), data: { title: "Conceal Live" } },
	{ path: 'explorer', loadChildren: () => import('./modules/explorer/explorer.module').then(m => m.ExplorerModule), data: { title: "Conceal Explorer" } },
	{ path: 'bridge', loadChildren: () => import('./modules/bridge/bridge.module').then(m => m.BridgeModule), data: { title: "Conceal Bridge" } },
	{ path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule), data: { title: "Authentication" } },
	{ path: 'settings', loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule), data: { title: "App Settings" } },
	{ path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
	providers: [AuthGuard],
})
export class AppRoutingModule { }