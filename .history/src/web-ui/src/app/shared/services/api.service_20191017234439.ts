import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {

    return this.http.get(environment.API_BASE_PATH + path, ({ params })).pipe(catchError(this.formatError));
  }

  post(path: string, params: HttpParams = new HttpParams()): Observable<any> {

    return this.http.post(path, ({ params })).pipe(catchError(this.formatError));
  }

  put(path: string, params: HttpParams = new HttpParams()): Observable<any> {

    return this.http.put(path, ({ params })).pipe(catchError(this.formatError));
  }

  delete(path: string, params: HttpParams = new HttpParams()): Observable<any> {

    return this.http.delete(path, ({ params })).pipe(catchError(this.formatError));
  }

  private formatError(error: any) {
    return Observable.of(error.error);
  }

}
