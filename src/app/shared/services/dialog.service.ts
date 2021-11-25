// Angular Core
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// Services
import { ThemingService } from './theming.service';

// Dialog Components
import { TwoFactorDialog } from 'src/app/shared/dialogs/twofactor/twofactor.component';
import { SendDialog } from 'src/app/modules/wallet/dialogs/send/send.component';
import { ReceiveDialog } from 'src/app/modules/wallet/dialogs/receive/receive.component';
import { ExportDialog } from 'src/app/modules/wallet/dialogs/export/export.component';
import { QrcodeDialog } from 'src/app/modules/wallet/dialogs/qrcode/qrcode.component';
import { MatrixDialog } from 'src/app/modules/deposits/dialogs/matrix/matrix.dialog';

@Injectable({
	providedIn: 'root'
})

export class DialogService {

	constructor (
		public dialog: MatDialog,
		public themingService: ThemingService
	) { }

	openMatrixDialog(): void {
		const dialogRef = this.dialog.open(MatrixDialog, {
			width: this.themingService.dialogWidth,
			maxWidth: this.themingService.dialogMaxWidth,
			height: this.themingService.dialogHeight,
			maxHeight: this.themingService.dialogHeight,
			disableClose: false
		})
		dialogRef.afterClosed().subscribe(result => { })
  }

	openTwoFactorDialog(): void {
		const dialogRef = this.dialog.open(TwoFactorDialog, {
			width: this.themingService.dialogWidth,
			maxWidth: this.themingService.dialogMaxWidth,
			height: this.themingService.dialogHeight,
			maxHeight: this.themingService.dialogHeight,
			disableClose: false
		})
		dialogRef.afterClosed().subscribe(result => { })
  }

	openQrcodeDialog(address:any): void {
		const dialogRef = this.dialog.open(QrcodeDialog, {
			width: this.themingService.qrcodeDialogWidth,
			maxWidth: this.themingService.dialogMaxWidth,
			height: this.themingService.dialogHeight,
			maxHeight: this.themingService.dialogHeight,
			disableClose: false,
			data: {address: address}
		})
		dialogRef.afterClosed().subscribe(result => { })
  }

	openExportDialog(address:any): void {
		const dialogRef = this.dialog.open(ExportDialog, {
			width: this.themingService.exportDialogWidth,
			maxWidth: this.themingService.dialogMaxWidth,
			height: this.themingService.dialogHeight,
			maxHeight: this.themingService.dialogHeight,
			disableClose: true,
			data: {address: address}
		})
		dialogRef.afterClosed().subscribe(result => { })
  }

	openSendDialog(wallet:any): void {
		const dialogRef = this.dialog.open(SendDialog, {
			width: this.themingService.dialogWidth,
			maxWidth: this.themingService.dialogMaxWidth,
			height: this.themingService.dialogHeight,
			maxHeight: this.themingService.dialogHeight,
			disableClose: true,
			data: {wallet: wallet}
		})
		dialogRef.afterClosed().subscribe(result => { })
  }

	openReceiveDialog(): void {
		const dialogRef = this.dialog.open(ReceiveDialog, {
			width: this.themingService.dialogWidth,
			maxWidth: this.themingService.dialogMaxWidth,
			height: this.themingService.dialogHeight,
			maxHeight: this.themingService.dialogHeight,
			disableClose: true
		})
		dialogRef.afterClosed().subscribe(result => { })
  }

	closeDialogs(): void {
		 this.dialog.closeAll();
	}

}