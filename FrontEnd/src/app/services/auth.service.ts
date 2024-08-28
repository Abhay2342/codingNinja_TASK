import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://codingninja-task.onrender.com/api/auth';
  private readonly TOKEN_KEY = 'authToken';
  private readonly USER_KEY = 'userData';

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  storeToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  storeUser(user: { id: string; username: string; email: string; token: string }): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getUser(): { id: string; username: string; email: string; token: string } | null {
    const userData = localStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  clearUser(): void {
    localStorage.removeItem(this.USER_KEY);
  }
}
