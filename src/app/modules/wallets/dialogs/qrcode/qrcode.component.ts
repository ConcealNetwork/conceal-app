// Angular
import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// 3rd Party
import QRCodeStyling from 'qr-code-styling';

@Component({
  selector: 'qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss'],
	animations: [
		trigger('transition', [
			transition(':enter', [
				style({ opacity: 0}),
				animate('0.3s ease-in', style({ opacity: 1}))
			])
		])
	]
})

export class QrcodeDialog implements OnInit {

	@ViewChild('qrcode', {static: true}) qrcode!: ElementRef;

  constructor(
		public dialogRef: MatDialogRef<QrcodeDialog>, @Inject(MAT_DIALOG_DATA) public data: any
	) {	}

  ngOnInit(): void {
		const qr = new QRCodeStyling({
			width: 315,
			height: 315,
			margin: 0,
			data: this.data.address,
			image: "../assets/images/qrcode.png",
			dotsOptions: {
				color: "#222",
				type: "dots"
			},
			cornersSquareOptions: {
				color:' #333',
				type: 'extra-rounded'
			},
			cornersDotOptions: {
				color:' #FFA500',
				type: 'dot'
			},
			backgroundOptions: {
				color: "#fff"
			},
			imageOptions: {
				margin: 0,
				imageSize: 0.4,
				hideBackgroundDots: false
			}
		});
		qr.append(this.qrcode.nativeElement);
	}

	close() {
		this.dialogRef.close(true);
	}

}
