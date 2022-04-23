import { environment } from 'src/environments/environment'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class NameService {

	api = environment.walletAPI

	constructor(private http: HttpClient) { }

	// Unique name validator from api call
	uniqueNameValidator(): AsyncValidatorFn {
		return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
			return this.http.get(`${this.api}/id/check?id=${control.value}`).pipe(
				map((res:any) => {
					return res.message[0] ? null : { nameExists: true }
				})
			)
		}
	}

}