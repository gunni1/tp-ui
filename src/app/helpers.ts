import {HttpErrorResponse} from "@angular/common/http";

export function handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    const body = JSON.stringify(error.error);
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${body}`);
  }
}
