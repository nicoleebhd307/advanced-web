import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginFashionService {
  private apiUrl = '/login';

  constructor(private _http: HttpClient) {}

  login(usr: string, pwd: string): Observable<any> {
    return this._http.post<any>(`${this.apiUrl}`, { usr, pwd });
  }

  register(usr: string, pwd: string): Observable<any> {
    return this._http.post<any>('/register', { usr, pwd });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
