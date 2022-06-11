import { environment } from 'src/environments/environment'
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class BalanceService {

	constructor() { }

	// check if the balance is enough
	checkBalance(): AsyncValidatorFn {
		return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
			return new Observable(observer => {
				if (control.value.balance >= environment.idValue) {
					observer.next(null);
				} else {
					observer.next({ hasBalance: true });
				}
				observer.complete();
			});
		}
	}



}