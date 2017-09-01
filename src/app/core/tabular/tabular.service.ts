import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {UserModel} from './user.model';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TabularService {

  private usersUrl = 'api/users';

  constructor(private http: Http) { }

  getUsers(): Promise<UserModel[]> {
    return this.http.get(this.usersUrl)
      .toPromise()
      .then(response => response.json().data as UserModel[])
      .catch(this.handleError);
  }

  getUser(id: number): Promise<UserModel> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as UserModel)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
