import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { StorageService } from './storage.service';

const BASE_API = 'https://training-homework.calllab.net';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(
    private client: HttpClient,
    private storageService: StorageService
  ) {}

  getQuizCategories(): Observable<any> {
    const token = this.storageService.getToken();
    return this.client
      .get(`${BASE_API}/v1/questions/categories`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(error);
        })
      );
  }

  getQuizById(id: string): Observable<any> {
    const token = this.storageService.getToken();
    return this.client
      .get(`${BASE_API}/v1/questions/categories/${id}`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(error);
        })
      );
  }

  submitQuiz(request: any): Observable<any> {
    const token = this.storageService.getToken();
    return this.client
      .post(`${BASE_API}/v1/questions/submit-assignment`, request, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(error);
        })
      );
  }
}
