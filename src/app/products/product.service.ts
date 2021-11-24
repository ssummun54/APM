import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { IProduct } from "./product";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
  
  constructor(private http: HttpClient){}
  private productUrl = 'api/products/products.json';

  getProducts(): Observable <IProduct[]>{
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      tap(data => console.log('All', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    // in real world app, we may send the server to some remote logging infrastrucutre instead of just logging in to the console
    let errorMessage = '';

    if(err.error instanceof ErrorEvent) {
      // a client-side or network error occured. Handle it accordingly.
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}