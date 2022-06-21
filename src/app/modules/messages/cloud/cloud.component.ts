// Angular Core
import { Component, OnInit } from '@angular/core';

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

@Component({
  selector: 'app-cloud',
  templateUrl: './cloud.component.html',
  styleUrls: ['./cloud.component.scss'],
})

export class CloudComponent implements OnInit {

	isLoading: boolean = true;
	messages: Messages[] = [];
	addresses: any;
	displayedColumns: string[] = ['date', 'address', 'type', 'message'];

  constructor(
		private cloudService: CloudService,
		private helperService: HelperService,
	) { }

	getHelperService() {
		return this.helperService;
	}

  ngOnInit(): void {
		this.getMessages();
  }

	getMessages() {
		this.isLoading = true;
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
					this.isLoading = false;
				}
			}
		);
	}

	applyFilter(event: Event) {

  }

}