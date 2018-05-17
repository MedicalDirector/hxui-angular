import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {UserModel} from './user.model';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TabularService {

  private usersUrl = 'api/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.usersUrl)
      .pipe(
        catchError(this.handleError('getUsers', []))
      );
  }

  getUser(id: number): Observable<UserModel> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<UserModel>(url)
      .pipe(
        catchError(this.handleError<UserModel>('getUsers id=${id}'))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
