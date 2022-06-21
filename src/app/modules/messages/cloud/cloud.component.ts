// Angular Core
import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

// Angular Material
import { MatTableDataSource } from '@angular/material/table';

// Services
import { CloudService } from 'src/app/shared/services/cloud.service';
import { HelperService } from 'src/app/shared/services/helper.service';

// Interfaces
export interface Messages {
	address: string;
	message: string;
	sdm: string;
	datetime: string;
	type: string;
}
export interface Contacts {
	address: string;
	id: number;
	label: string;
	paymentId: string;
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

	isMessagesLoading: boolean = true;
	isContactsLoading: boolean = true;
	messages: Messages[] = [];
	contacts: Contacts[] = [];
	addresses: any;
	messageColumns: string[] = ['date', 'address', 'type', 'message'];
	contactColumns: string[] = ['select', 'label', 'address', 'paymentId'];
	selection = new SelectionModel<Contacts>(true, []);
	showMessages: boolean = true;
	showContacts: boolean = false;

  constructor(
		private cloudService: CloudService,
		private helperService: HelperService,
		public breakpointObserver: BreakpointObserver,
	) { }

	getHelperService() {
		return this.helperService;
	}

  ngOnInit(): void {
		this.getMessages();
		this.getContacts();
		this.checkBreakpoint();
  }

	checkBreakpoint() {
		this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall]).subscribe((state: BreakpointState) => {
			if (state.matches) {
				// Matches small viewport or handset in portrait mode
				this.messageColumns = ['date', 'type', 'message'];
				this.contactColumns = ['select', 'label', 'address',];
			}
		})
	}

	getMessages() {
		this.isMessagesLoading = true;
		this.cloudService.getMessages().subscribe(
			(data: any) => {
				if (data.result === 'success') {
					// convert object to array with key as address
					Object.keys(data.message).map(key => {
						for (let i = 0; i < data.message[key].length; i++) {
							this.messages.push({
								address: key,
								message: data.message[key][i].message,
								sdm: data.message[key][i].sdm,
								datetime: data.message[key][i].timestamp,
								type: data.message[key][i].type,
							});
						}
					});
					// get addresses from messages
					let addresses = this.messages.map(message => message.address);
					this.addresses = addresses.filter((address:any, index:any, self:any) => self.indexOf(address) === index); // remove duplicates
					this.isMessagesLoading = false;
				}
			}
		)
	}

	getContacts() {
		this.isContactsLoading = true;
		this.cloudService.getContacts().subscribe(
			(data: any) => {
				if (data.result === 'success') {
					// convert object to array with key as address
					for (let i = 0; i < data.message.addressBook.length; i++) {
						this.contacts.push({
							address: data.message.addressBook[i].address,
							id: data.message.addressBook[i].entryID,
							label: data.message.addressBook[i].label,
							paymentId: data.message.addressBook[i].paymentID,
						});
					}
					this.isContactsLoading = false;
					//console.log(this.contacts);
				}
			}
		)
	}

	applyFilter(event: Event) {
  }

	/** Whether the number of selected elements matches the total number of rows. */
	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.contacts.length;
		return numSelected === numRows;
	}

	/** Selects all rows if they are not all selected; otherwise clear selection. */
	masterToggle() {
		if (this.isAllSelected()) {
			this.selection.clear();
			return;
		}
		this.selection.select(...this.contacts);
	}

	/** The label for the checkbox on the passed row */
	checkboxLabel(row?: Contacts): string {
		if (!row) {
			return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
		}
		return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.label + 1}`;
	}

	toggleMessages() {
		this.showMessages = true;
		this.showContacts = false;
	}

	toggleContacts() {
		this.showContacts = true;
		this.showMessages = false;
	}

}