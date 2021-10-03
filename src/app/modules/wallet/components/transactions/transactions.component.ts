// Angular Core
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

// Angular Material
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// Services
import { HelperService } from './../../../../shared/services/helper.service';
import { CloudService } from './../../../../shared/services/cloud.service';

export interface Transactions {
	type: string;
	status: string;
	amount: number;
	fee: number;
	timestamp: string;
	address: string;
}

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})

export class TransactionsComponent implements OnInit {

	// MatPaginator Output
	pageEvent!: PageEvent;
	pageSize: number = 10;
	pageSizeOptions: number[] = [5, 10, 25, 100];
	displayedColumns: string[] = ['timestamp', 'type', 'amount'];
	dataSource!: MatTableDataSource<Transactions>;
	isLoadingResults: boolean = true;
	isRefreshingResults: boolean = true;
	wallets: any;
	transactions: any;

	@ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;

  constructor(
		public breakpointObserver: BreakpointObserver,
		private changeDetectorRefs: ChangeDetectorRef,
		private helperService: HelperService,
		private cloudService: CloudService
	) {
		// Assign the data to the data source for the table to render
		setTimeout(() => {
			this.dataSource = new MatTableDataSource(this.transactions);
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
			this.isLoadingResults = false;
			this.isRefreshingResults = false;
		}, 2000);
	}

	getHelperService() {
		return this.helperService;
	}

	ngOnInit() {
		this.refresh();
		this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
		.subscribe((state: BreakpointState) => {
			if (state.matches) {
				// Matches small viewport or handset in portrait mode
				this.pageSize = 5;
				this.displayedColumns = ['timestamp', 'type', 'amount'];
			} else {
				this.pageSize = 10;
				this.displayedColumns = ['timestamp', 'type', 'amount', 'fee', 'status'];
			}
		});
  }

	getWalletData() {
		this.cloudService.getWalletsData().subscribe((data:any) => {
			this.wallets = data.message.wallets;
			let transactions: any = Object.values(this.wallets);
			let arr = [];
			for(let i = 0; i < transactions.length; i++) {
				arr.push(transactions[i]['transactions']);
			}
			let mergedTransactions = Array.prototype.concat(...arr);
			this.transactions = mergedTransactions;
		});
	}

	refresh() {
		this.isRefreshingResults = true;
		this.getWalletData();
		setTimeout(() => {
			this.dataSource = new MatTableDataSource(this.transactions);
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
			this.changeDetectorRefs.detectChanges();
			this.isRefreshingResults = false;
		}, 2000);
	}

	applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
