import { Injectable } from '@angular/core';
import {UserModel} from './user.model';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/internal/operators';

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
        catchError(this.handleError<UserModel>('getUser id=${id}'))
      );
  }

  getUserByRole(role: string): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.usersUrl)
      .pipe(map((users) => {
        users = users.filter((data) => data.rolename === role );
        return users;
      }))
      .pipe(
        catchError(this.handleError('getUsers', []))
      );
  }

  filterUserByName(name: string): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.usersUrl)
      .pipe(map((users) => {
        const regexp = new RegExp(name, 'i');
        users = users.filter(data => regexp.test(data.firstname) || regexp.test(data.surname));
        return users;
      }))
      .pipe(
        catchError(this.handleError('getUsers', []))
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
