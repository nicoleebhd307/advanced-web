import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FashionAPI {
  private apiUrl = '/fashions';

  constructor(private _http: HttpClient) {}

  getFashions(): Observable<any[]> {
    return this._http.get<any[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  getFashionById(id: string): Observable<any> {
    return this._http.get<any>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  searchByStyle(style: string): Observable<any[]> {
    return this._http
      .get<any[]>(`${this.apiUrl}/search/${style}`)
      .pipe(catchError(this.handleError));
  }

  createFashion(data: any): Observable<any> {
    return this._http.post<any>(this.apiUrl, data).pipe(catchError(this.handleError));
  }

  updateFashion(id: string, data: any): Observable<any> {
    return this._http.put<any>(`${this.apiUrl}/${id}`, data).pipe(catchError(this.handleError));
  }

  deleteFashion(id: string): Observable<any> {
    return this._http.delete<any>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }
}
