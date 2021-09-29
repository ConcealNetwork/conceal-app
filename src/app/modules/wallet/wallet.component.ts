// Angular Core
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';

// Angular Material
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// Services
import { HelperService } from './../../shared/services/helper.service';
import { DataService } from './../../shared/services/data.service';
import { CloudService } from './../../shared/services/cloud.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

	// MatPaginator Output
	pageEvent!: PageEvent;
	pageSize: number = 10;
	pageSizeOptions: number[] = [5, 10, 25, 100];
	displayedColumns: string[] = ['type', 'status', 'amount', 'fee', 'timestamp', 'address'];
	dataSource: MatTableDataSource<any>;
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
		// Assign the data to the data source for the table to render
		this.dataSource = new MatTableDataSource(this.transactions);
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
		this.isLoading = false;
	}

	getHelperService() {
		return this.helperService;
	}

  ngOnInit(): void {
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

	applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
