// Angular Core
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// Services
import { ThemingService } from './theming.service';

// Dialog Components
import { TwoFactorDialog } from 'src/app/shared/dialogs/twofactor/twofactor.component';
import { SendDialog } from 'src/app/modules/wallets/cloud/dialogs/send/send.component';
import { ReceiveDialog } from 'src/app/modules/wallets/cloud/dialogs/receive/receive.component';
import { ExportDialog } from 'src/app/modules/wallets/cloud/dialogs/export/export.component';
import { CodeDialog } from 'src/app/modules/wallets/cloud/dialogs/code/code.component';
import { MatrixDialog } from 'src/app/modules/deposits/dialogs/matrix/matrix.dialog';
import { PendingDialog } from 'src/app/modules/deposits/dialogs/pending/pending.dialog';
import { ConfirmationDialog } from 'src/app/modules/deposits/dialogs/confirmation/confirmation.dialog';
import { ArticleDialog } from 'src/app/modules/media/dialogs/article/article.dialog';

@Injectable({
	providedIn: 'root'
})

export class DialogService {

	constructor (
		public dialog: MatDialog,
		public themingService: ThemingService
	) { }

	openConfirmationDialog(deposit:any): void {
		const dialogRef = this.dialog.open(ConfirmationDialog, {
			width: this.themingService.exportDialogWidth,
			maxWidth: this.themingService.exportDialogWidth,
			height: this.themingService.dialogHeight,
			maxHeight: this.themingService.dialogHeight,
			disableClose: true,
			data: {deposit: deposit}
		})
		dialogRef.afterClosed().subscribe(result => { })
  }

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

	openPendingDialog(): void {
		const dialogRef = this.dialog.open(PendingDialog, {
			width: this.themingService.exportDialogWidth,
			maxWidth: this.themingService.exportDialogWidth,
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
		const dialogRef = this.dialog.open(CodeDialog, {
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

	openArticleDialog(article:any): void {
		const dialogRef = this.dialog.open(ArticleDialog, {
			width: this.themingService.articleDialogWidth,
			maxWidth: this.themingService.articleDialogWidth,
			height: this.themingService.articleDialogHeight,
			maxHeight: this.themingService.articleDialogHeight,
			disableClose: false,
			data: {article: article}
		})
		dialogRef.afterClosed().subscribe(result => { })
  }

	closeDialogs(): void {
		 this.dialog.closeAll();
	}

}