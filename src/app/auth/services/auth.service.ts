import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';
import { AuthResponse, Usuario } from '../Interfaces/AuthInterface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _usuario!: Usuario;
  url: string = 'http://localhost:4000/api/auth';

  get usuario() {
    return { ...this._usuario };
  }

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(`${this.url}/login`, { email, password })
      .pipe(
        tap((resp) => {
          if (resp.ok) {
            localStorage.setItem('token', resp.token!);
            this._usuario = {
              email: resp.email!,
              name: resp.name!,
              lastName: resp.lastName!,
              uid: resp.uid!,
            };
          }
        }),
        map((resp) => resp.ok),
        catchError((err) => of(err.error.msg))
      );
  }

  ValidarToken() {
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );
    return this.http
      .get<AuthResponse>(`${this.url}/renew`, { headers: headers })
      .pipe(
        map((res) => {
          if (res.ok) {
            localStorage.setItem('token', res.token!);
            this._usuario = {
              email: res.email!,
              name: res.name!,
              lastName: res.lastName!,
              uid: res.uid!,
            };
          }
          return res.ok;
        }),
        catchError((err) => of(false))
      );
  }

  logout() {
    localStorage.removeItem('token');
  }

  register(name: string, lastName: string, email: string, password: string) {
    return this.http
      .post<AuthResponse>(`${this.url}/new`, {
        name,
        lastName,
        email,
        password,
      })
      .pipe(
        tap((resp) => {
          if (resp.ok) {
            localStorage.setItem('token', resp.token!);
            this._usuario = {
              email: resp.email!,
              name: resp.name!,
              lastName: resp.lastName!,
              uid: resp.uid!,
            };
          }
        }),
        map((resp) => resp.ok),
        catchError((err) => of(err.error.msg))
      );
  }
}
