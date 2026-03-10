import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { ICoinItem } from './pages/CoinDataItem';

@Injectable({
  providedIn: 'root'
})
// export class CoinService {

//   private api = '/crypto/v1/ticker/';

//   constructor(private http: HttpClient) {}

//   getBitcoinPrice(): Observable<any> {
//     return this.http.get(this.api);
//   }
// }
export class CoinService {
  private _url: string = "/crypto/v1/ticker/"
  constructor(private _http: HttpClient) { }
  getBitcoinPrice(): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>(this._url, requestOptions).pipe(
      map(res => JSON.parse(res) as Array<ICoinItem>),
      retry(3),
      catchError(this.handleError))
  }
  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message))
  }}