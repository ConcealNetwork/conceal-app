// Angular Core
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';

// Angular Material
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// Services
import { HelperService } from './../../shared/services/helper.service';
import { DataService } from './../../shared/services/data.service';

export interface Transactions {
	type: string;
	status: string;
	amount: number;
	fee: number;
	timestamp: string;
	address: string;
}

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
	dataSource: MatTableDataSource<Transactions>;
	isLoading: boolean = true;

	@ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;

  constructor(
		private changeDetectorRefs: ChangeDetectorRef,
		private helperService: HelperService,
		private dataService: DataService
	) {
		// Assign the data to the data source for the table to render
		this.dataSource = new MatTableDataSource();
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
		this.isLoading = false;
	}

	getHelperService() {
		return this.helperService;
	}

  ngOnInit(): void {

  }

	applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
