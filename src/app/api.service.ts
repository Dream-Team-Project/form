import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment as env } from './../environments/environment';

@Injectable()
export class ApiService {
  
  public isDataUpdated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private _url: string = "./api/user";
  // URL = 'users';

  constructor(private http: HttpClient) { 
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(this._url)
    .pipe(catchError(this.errorHandler))
  }

  getSingleUser(id:any): Observable<any> {
    return this.http.get<any>(this._url+'/'+id)
    .pipe(catchError(this.errorHandler))
  }

  saveUser(data:any): Observable<any> {
    return this.http.post<any>(this._url, data)
    .pipe(catchError(this.errorHandler))
  }

  updateUser(data:any, id:any): Observable<any> {
    return this.http.put<any>(this._url+'/'+id, data)
    .pipe(catchError(this.errorHandler))
  }

  deleteUser(id:any): Observable<any> {
    return this.http.delete<any>(this._url+'/'+id)
    .pipe(catchError(this.errorHandler))
  }
  
  errorHandler(error: HttpErrorResponse) {
    return throwError(()=>error.message || "Sever Error")
  }
}
