import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {

    return this.http.get(path, ({ params })).pipe(
      catchError(this.formatError)
    );
  }


  post(path: string, params: HttpParams = new HttpParams()): Observable<any> {

    return this.http.post(path, ({ params })).pipe(
      catchError(this.formatError)
    );
  }

  put(path: string, params: HttpParams = new HttpParams()): Observable<any> {

    return this.http.put(path, ({ params })).pipe(
      catchError(this.formatError)
    );
  }

  delete(path: string, params: HttpParams = new HttpParams()): Observable<any> {

    return this.http.delete(path, ({ params })).pipe(
      catchError(this.formatError)
    );
  }

  formatError(error: any) {
    return Observable.of(error.error);
  }

}
