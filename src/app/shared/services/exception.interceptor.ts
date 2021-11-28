// Angular Core
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

// RxJS
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

// Services
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
		public router: Router,
		private snackbarService: SnackbarService,
	) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        console.error(error);
				this.snackbarService.openSnackBar(error.message, 'Dismiss');
				return throwError(() => error.message);
      })
    );
  }

}