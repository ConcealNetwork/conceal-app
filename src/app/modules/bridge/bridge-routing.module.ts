// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Services
import { APIService } from './services/api.service';

// Components
import { BridgeComponent } from './bridge.component';
import { CcxSwapComponent } from './components/ccx/ccx.component';
import { EthSwapComponent } from './components/eth/eth.component';
import { BscSwapComponent } from './components/bsc/bsc.component';
import { PlgSwapComponent } from './components/plg/plg.component';
import { AvaxSwapComponent } from './components/avax/avax.component';


const routes: Routes = [
	{ path: '', component: BridgeComponent },
	{
		path: 'ccx', component: CcxSwapComponent,
		resolve: { config: APIService }
	},
	{
		path: 'eth', component: EthSwapComponent,
		resolve: { config: APIService }
	},
	{
		path: 'bsc', component: BscSwapComponent,
		resolve: { config: APIService }
	},
	{
		path: 'plg', component: PlgSwapComponent,
		resolve: { config: APIService }
	},
	{
		path: 'avax', component: AvaxSwapComponent,
		resolve: { config: APIService }
	},
	{ path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
	providers: [APIService]
})
export class BridgeRoutingModule { }
