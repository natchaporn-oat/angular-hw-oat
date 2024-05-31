import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  clean(): void {
    sessionStorage.clear();
  }

  public getToken(): string {
    const authData = sessionStorage.getItem('token');
    if (authData) {
      const token = JSON.parse(authData);
      return token.data.accessToken;
    } else {
      return '';
    }
  }

  public saveToken(user: any): void {
    sessionStorage.removeItem('token');
    sessionStorage.setItem('token', JSON.stringify(user));
  }

  public isLogIn(): boolean {
    return sessionStorage.getItem('token') !== null;
  }
}
