// Angular Core
import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

// Angular Material
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// Services
import { CloudService } from 'src/app/shared/services/cloud.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { DialogService } from 'src/app/shared/services/dialog.service';

// Interfaces
export interface Messages {
	id: number;
	address: string;
	message: string;
	sdm: string;
	timestamp: string;
	type: string;
}

@Component({
  selector: 'app-cloud',
  templateUrl: './cloud.component.html',
  styleUrls: ['./cloud.component.scss'],
	animations: [
		trigger('transition', [
			transition(':enter', [
				query('#cards', [
					style({ opacity: 0}),
					stagger(100, [
						animate('0.4s', style({ opacity: 1 }))
					])
				], {optional: true})
			])
		])
	]
})

export class CloudComponent implements OnInit {

  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    if (this.messagesSource){
      this.messagesSource.paginator = value;
    }
  }

  @ViewChild(MatSort, {static: false})
  set sort(value: MatSort) {
    if (this.messagesSource){
      this.messagesSource.sort = value;
    }
  }

	isLoading: boolean = true;
	isLoadingResults: boolean = false;
	isIncoming: boolean = true;
	addresses: any;
	revalAll: boolean = false;
	revalOne: boolean = false;
	revealItem: number = -1;

	// tables
	messages: Messages[] = [];
	messagesSource!: MatTableDataSource<Messages>;
	pageEvent!: PageEvent;
	pageSize: number = 10;
	pageSizeOptions: number[] = [5, 10, 25];
	messageColumns: string[] = ['timestamp', 'address', 'message'];

  constructor(
		private cloudService: CloudService,
		private helperService: HelperService,
		private dialogService: DialogService,
		public breakpointObserver: BreakpointObserver,
	) { }

	getDialogService() {
		return this.dialogService;
	}

	getHelperService() {
		return this.helperService;
	}

  ngOnInit(): void {
		this.checkBreakpoint();
		this.getMessages();
		this.isLoading = false;
  }

	checkBreakpoint() {
		this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall]).subscribe((state: BreakpointState) => {
			if (state.matches) {
				// Matches small viewport or handset in portrait mode
				this.messageColumns = ['timestamp', 'message'];
			}
		})
	}

	getMessages() {
		// empty this.messages array
		this.isLoadingResults = true;
		this.messages = [];
		this.messagesSource = new MatTableDataSource(this.messages);
		// if this messages is empty, get the messages from the cloud
		if (this.messages.length === 0) {
			this.cloudService.getMessages().subscribe(
				(data: any) => {
					if (data.result === 'success') {
						// convert object to array with key as address
						Object.keys(data.message).map(key => {
							for (let i = 0; i < data.message[key].length; i++) {
								this.messages.push({
									id: i,
									address: key,
									message: data.message[key][i].message,
									sdm: data.message[key][i].sdm,
									timestamp: data.message[key][i].timestamp,
									type: data.message[key][i].type,
								});
							}
						})
						// get addresses from messages
						let addresses = this.messages.map(message => message.address);
						this.addresses = addresses.filter((address:any, index:any, self:any) => self.indexOf(address) === index); // remove duplicates
						this.messagesSource = new MatTableDataSource(this.messages);
						if (this.isIncoming) this.messagesSource = new MatTableDataSource(this.messages.filter(message => message.type === 'in'));
						this.isLoadingResults = false;
					}
				}
			)
		}
	}

	inComing() {
		this.isIncoming = true;
		this.messagesSource = new MatTableDataSource(this.messages.filter(message => message.type === 'in'));
	}

	outGoing() {
		this.isIncoming = false;
		this.messagesSource = new MatTableDataSource(this.messages.filter(message => message.type === 'out'));
	}

	// hide the text of the messages in the table
	revealMessage(item: any) {
		this.revalOne = !this.revalOne;
		if (item && this.revalOne) {
			// get the row of the message and append the text in the td
			this.revealItem = item.id;
		} else {
			this.revealItem = -1;
		}
	}

	revealAllToggle() {
		this.revalAll = !this.revalAll;
	}

	applyFilter(event: Event, source: any) {
		const filterValue = (event.target as HTMLInputElement).value;
		source.filter = filterValue.trim().toLowerCase();
    if (source.paginator) {
			source.paginator.firstPage();
    }
  }

}