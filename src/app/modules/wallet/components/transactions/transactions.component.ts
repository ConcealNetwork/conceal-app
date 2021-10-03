// Angular Core
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';

// Angular Material
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// Services
import { HelperService } from './../../../../shared/services/helper.service';
import { DataService } from './../../../../shared/services/data.service';
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
	displayedColumns: string[] = ['type', 'status', 'amount', 'fee', 'timestamp', 'address'];
	dataSource: MatTableDataSource<Transactions>;
	isLoading: boolean = true;
	transactions: any;

	@ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;

  constructor(
		private changeDetectorRefs: ChangeDetectorRef,
		private helperService: HelperService,
		private dataService: DataService,
		private cloudService: CloudService
	) {
		this.dataService.transactions.subscribe((data:any) => {
			this.transactions = data;
		});
		// Assign the data to the data source for the table to render
		this.dataSource = new MatTableDataSource(this.transactions);
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	getHelperService() {
		return this.helperService;
	}

  ngOnInit(): void {
		this.refresh();
  }

	getWalletData() {
		// Wallets
		this.cloudService.getWalletsData().subscribe((data:any) => {
			this.dataService.getWallets(data.message.wallets);
		});
		// Transactions
		this.dataService.wallets.subscribe((wallets:any) => {
			let transactions: any = Object.values(wallets);
			let arr = [];
			for(let i = 0; i < transactions.length; i++) {
				arr.push(transactions[i]['transactions']);
			}
			const merge = Array.prototype.concat(...arr);
			this.dataService.getTransactions(merge);
		});
		this.dataService.transactions.subscribe((data:any) => {
			this.transactions = data;
			console.log(this.transactions);
		});
	}

	refresh() {
		this.isLoading = true;
		this.getWalletData();
		setTimeout(() => {
			this.dataSource = new MatTableDataSource(this.transactions);
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
			this.changeDetectorRefs.detectChanges();
			this.isLoading = false;
		}, 3000);
	}


	applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
